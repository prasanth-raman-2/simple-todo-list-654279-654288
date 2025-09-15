import React, { useMemo, useState, useCallback } from 'react';
import styles from './Search.module.css';

// PUBLIC_INTERFACE
export default function Search() {
  /**
   * Search screen converted from static HTML/CSS/JS.
   * - Implements chips filter and text search
   * - Bookmark toggling on each result card
   * - Clear button visibility bound to input content
   */

  // Static demo data mapped from the HTML asset
  const initialResults = useMemo(
    () => [
      {
        id: 1,
        title: 'Spicy chicken burger with French fries',
        rating: 4.5,
        time: '20 min',
        location: 'Lagos',
        img: '/assets/figma_image_100_2430.png',
        tags: ['burger', 'fastfood'],
        bookmarked: false,
      },
      {
        id: 2,
        title: 'Green goddess salad',
        rating: 4.3,
        time: '15 min',
        location: 'Ikeja',
        img: '/assets/figma_image_103_3225.png',
        tags: ['vegan', 'salad', 'healthy'],
        bookmarked: false,
      },
    ],
    []
  );

  const chipOptions = useMemo(
    () => ['all', 'burger', 'pizza', 'pasta', 'vegan', 'dessert'],
    []
  );

  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('all');
  const [results, setResults] = useState(initialResults);

  const handleToggleBookmark = useCallback((id) => {
    setResults((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, bookmarked: !r.bookmarked } : r
      )
    );
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return results.filter((r) => {
      const title = r.title.toLowerCase();
      const tagsStr = r.tags.join(' ').toLowerCase();
      const matchesText = !q || title.includes(q) || tagsStr.includes(q);
      const matchesChip = activeChip === 'all' || r.tags.includes(activeChip);
      return matchesText && matchesChip;
    });
  }, [results, query, activeChip]);

  return (
    <div className={`${styles.screen}`} id="search-screen">
      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div>09:41</div>
        <div>LTE • 85%</div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.iconBtn}
          aria-label="Go back"
          title="Back"
          onClick={() => {
            if (window.history.length > 1) window.history.back();
          }}
        >
          <svg className={styles.icon20} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={styles.iconBtn}
          aria-label="More options"
          title="More"
          onClick={() => {
            // Placeholder for menu actions
            // eslint-disable-next-line no-console
            console.log('More options clicked');
          }}
        >
          <svg className={styles.icon20} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </header>

      {/* Search Field */}
      <div className={styles.searchWrap}>
        <div className={`${styles.searchInput} ${query ? styles.hasText : ''}`}>
          <svg className={styles.icon20} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
            <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
          <input
            id="search-text"
            type="text"
            placeholder="Search recipes, chefs, cuisines"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={`${styles.iconBtn} ${styles.clearBtn}`}
            id="clear-search"
            aria-label="Clear search"
            title="Clear"
            onClick={handleClear}
          >
            <svg className={styles.icon16} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chips */}
      <div className={styles.chips} id="chips">
        {chipOptions.map((chip) => (
          <button
            key={chip}
            className={`${styles.chip} ${activeChip === chip ? styles.active : ''}`}
            data-chip={chip}
            onClick={() => setActiveChip(chip)}
          >
            {chip.charAt(0).toUpperCase() + chip.slice(1)}
          </button>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Results</h2>

      {/* Results */}
      <div className={styles.results} id="results">
        {filteredResults.map((card) => (
          <article key={card.id} className={styles.resultCard}>
            <div className={styles.resultThumb} aria-hidden="true">
              <img src={card.img} alt={card.title} />
            </div>
            <div className={styles.resultInfo}>
              <div className={styles.resultTitle}>{card.title}</div>
              <div className={styles.resultMeta}>
                <span className={styles.metaGroup} title="Rating">
                  <svg className={styles.icon16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.3l6.18 3.7-1.64-7 5.46-4.73-7.19-.62L12 2 9.19 8.65l-7.19.62 5.46 4.73-1.64 7L12 17.3z" />
                  </svg>
                  {card.rating.toFixed(1)}
                </span>
                <span className={styles.metaGroup} title="Time">
                  <svg className={styles.icon16} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path d="M12 7v5l3 2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {card.time}
                </span>
                <span className={styles.metaGroup} title="Location">
                  <svg className={styles.icon16} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 14 6 14s6-9.5 6-14c0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z" />
                  </svg>
                  {card.location}
                </span>
              </div>
            </div>
            <div className={styles.resultAction}>
              <span className={styles.ratingBadge} aria-label={`Rating ${card.rating.toFixed(1)}`}>
                <span>★</span>
                <span>{card.rating.toFixed(1)}</span>
              </span>
              <button
                className={`${styles.bookmarkBtn} ${card.bookmarked ? styles.active : ''}`}
                aria-pressed={card.bookmarked ? 'true' : 'false'}
                title="Bookmark"
                onClick={() => handleToggleBookmark(card.id)}
              >
                <svg className={styles.icon16} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </article>
        ))}

        {filteredResults.length === 0 && (
          <div aria-live="polite" className={styles.emptyState}>
            No results. Try a different search or chip.
          </div>
        )}
      </div>
    </div>
  );
}
