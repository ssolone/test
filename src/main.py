#!/usr/bin/env python3
"""Entry point for the daily product sourcing pipeline."""

import sys
import json
from pathlib import Path

# Ensure project root is on the path when run directly
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.sourcing.pipeline import run_daily_pipeline
from src.utils.logger import logger


def main():
    logger.info("Starting product sourcing automation")
    try:
        result = run_daily_pipeline()
        print(json.dumps(result, ensure_ascii=False, indent=2))
        logger.info("Pipeline completed successfully")
    except Exception as e:
        logger.error(f"Pipeline failed with unhandled exception: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
