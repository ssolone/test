import sqlite3
import json
from datetime import datetime
from pathlib import Path
from typing import Optional

from config.settings import DB_PATH
from src.utils.logger import logger


def get_connection() -> sqlite3.Connection:
    Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS sourced_products (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            source_platform TEXT    NOT NULL,
            source_id       TEXT    NOT NULL,
            title_original  TEXT,
            title_kr        TEXT,
            description_kr  TEXT,
            price_usd       REAL,
            price_krw       INTEGER,
            image_url       TEXT,
            product_url     TEXT,
            category        TEXT,
            keywords        TEXT,
            trend_score     REAL,
            naver_listed    INTEGER DEFAULT 0,
            naver_product_id TEXT,
            created_at      TEXT,
            updated_at      TEXT,
            UNIQUE(source_platform, source_id)
        );

        CREATE TABLE IF NOT EXISTS trend_keywords (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            keyword     TEXT    NOT NULL,
            category    TEXT,
            google_score REAL,
            naver_score  REAL,
            composite_score REAL,
            fetched_at  TEXT,
            UNIQUE(keyword, fetched_at)
        );

        CREATE TABLE IF NOT EXISTS daily_run_log (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            run_date    TEXT    NOT NULL,
            keywords_found INTEGER,
            products_sourced INTEGER,
            products_listed  INTEGER,
            errors      TEXT,
            duration_sec REAL,
            created_at  TEXT
        );
    """)
    conn.commit()
    conn.close()
    logger.info("Database initialized")


def upsert_product(product: dict) -> bool:
    conn = get_connection()
    try:
        now = datetime.utcnow().isoformat()
        conn.execute("""
            INSERT INTO sourced_products
                (source_platform, source_id, title_original, title_kr, description_kr,
                 price_usd, price_krw, image_url, product_url, category, keywords,
                 trend_score, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(source_platform, source_id) DO UPDATE SET
                title_kr        = excluded.title_kr,
                description_kr  = excluded.description_kr,
                price_usd       = excluded.price_usd,
                price_krw       = excluded.price_krw,
                image_url       = excluded.image_url,
                trend_score     = excluded.trend_score,
                updated_at      = excluded.updated_at
        """, (
            product.get("source_platform"),
            product.get("source_id"),
            product.get("title_original"),
            product.get("title_kr"),
            product.get("description_kr"),
            product.get("price_usd"),
            product.get("price_krw"),
            product.get("image_url"),
            product.get("product_url"),
            product.get("category"),
            json.dumps(product.get("keywords", []), ensure_ascii=False),
            product.get("trend_score"),
            now,
            now,
        ))
        conn.commit()
        return True
    except Exception as e:
        logger.error(f"DB upsert failed: {e}")
        return False
    finally:
        conn.close()


def mark_as_listed(source_platform: str, source_id: str, naver_product_id: str):
    conn = get_connection()
    conn.execute("""
        UPDATE sourced_products
        SET naver_listed = 1, naver_product_id = ?, updated_at = ?
        WHERE source_platform = ? AND source_id = ?
    """, (naver_product_id, datetime.utcnow().isoformat(), source_platform, source_id))
    conn.commit()
    conn.close()


def get_unlisted_products(limit: int = 50) -> list[dict]:
    conn = get_connection()
    rows = conn.execute("""
        SELECT * FROM sourced_products
        WHERE naver_listed = 0
        ORDER BY trend_score DESC
        LIMIT ?
    """, (limit,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def save_run_log(log: dict):
    conn = get_connection()
    conn.execute("""
        INSERT INTO daily_run_log
            (run_date, keywords_found, products_sourced, products_listed, errors, duration_sec, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        log.get("run_date"),
        log.get("keywords_found", 0),
        log.get("products_sourced", 0),
        log.get("products_listed", 0),
        log.get("errors", ""),
        log.get("duration_sec", 0),
        datetime.utcnow().isoformat(),
    ))
    conn.commit()
    conn.close()
