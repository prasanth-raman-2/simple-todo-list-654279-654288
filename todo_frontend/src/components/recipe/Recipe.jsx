import React, { useState } from 'react';
import styles from './Recipe.module.css';

// SVG Components
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M3.91675 -369.058L5.05833 -364L14.0583 -364" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const MoreIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="4" cy="12" r="2" fill="currentColor"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <circle cx="20" cy="12" r="2" fill="currentColor"/>
    </svg>
);

const TimerIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" className="timer-icon">
        <path d="M13.458 -219.844C10.331 -219.844 7.771 -217.284 7.771 -214.156C7.771 -211.029 10.331 -208.469 13.458 -208.469C16.586 -208.469 19.146 -211.029 19.146 -214.156C19.146 -217.284 16.586 -219.844 13.458 -219.844Z" fill="currentColor"/>
    </svg>
);

const BookmarkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M12.667 -220.833L3.333 -220.833C2.875 -220.833 2.5 -220.458 2.5 -220L2.5 -207.167L8 -209.167L13.5 -207.167L13.5 -220C13.5 -220.458 13.125 -220.833 12.667 -220.833Z" fill="none" stroke="currentColor"/>
    </svg>
);

const LocationIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17">
        <path d="M12.573 -106.76C11.406 -108.094 9.823 -108.833 8.125 -108.833C6.427 -108.833 4.844 -108.094 3.677 -106.76C1.26 -103.99 0.531 -98.74 2.448 -95.323C4.01 -92.573 7.229 -89.583 8.125 -89.583C9.021 -89.583 12.24 -92.573 13.802 -95.323C15.719 -98.74 14.99 -103.99 12.573 -106.76Z" fill="currentColor"/>
    </svg>
);

const ServeIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" className="serve-icon">
        <path d="M3.947 3.348L1.189 3.348M3.947 2.278L1.189 2.278M3.947 4.418L1.189 4.418" stroke="currentColor" strokeWidth="0.2"/>
    </svg>
);

// PUBLIC_INTERFACE
const Recipe = () => {
    const [activeTab, setActiveTab] = useState('Ingrident');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    const handleBackClick = () => {
        console.log('Back button clicked');
        // Add navigation logic here
    };

    const handleMoreClick = () => {
        console.log('More options clicked');
        // Add more options menu logic here
    };

    return (
        <div className={styles.container}>
            <div className={styles.statusBar}>
                <div className={styles.time}>19:27</div>
                <div className={styles.statusIcons}>
                    <div className={styles.signal}></div>
                    <div className={styles.wifi}></div>
                    <div className={styles.battery}></div>
                </div>
            </div>

            <header className={styles.header}>
                <button className={styles.backBtn} onClick={handleBackClick} aria-label="Go back">
                    <BackIcon />
                </button>
                <button className={styles.moreBtn} onClick={handleMoreClick} aria-label="More options">
                    <MoreIcon />
                </button>
            </header>

            <div className={styles.recipeCard}>
                <div className={styles.imageContainer}>
                    <img 
                        src="/assets/figma_image_100_2329.png" 
                        alt="Spicy chicken burger" 
                        className={styles.mainImage}
                    />
                    <img 
                        src="/assets/figma_image_100_2330.png" 
                        alt="Spicy chicken burger with french fries" 
                        className={styles.overlayImage}
                    />
                    <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span className={styles.score}>4.0</span>
                    </div>
                </div>
                
                <div className={styles.recipeDetails}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>Spicy chicken burger with French fries</h1>
                        <div className={styles.time}>
                            <TimerIcon />
                            <span>20 min</span>
                        </div>
                        <button 
                            className={`${styles.bookmarkBtn} ${isBookmarked ? styles.active : ''}`}
                            onClick={handleBookmarkClick}
                            aria-label="Bookmark recipe"
                        >
                            <BookmarkIcon />
                        </button>
                    </div>
                    <div className={styles.reviews}>(13k Reviews)</div>
                </div>
            </div>

            <div className={styles.creatorProfile}>
                <div className={styles.creatorInfo}>
                    <img 
                        src="/assets/figma_image_100_2357.png" 
                        alt="Laura wilson" 
                        className={styles.creatorImage}
                    />
                    <div className={styles.creatorDetails}>
                        <h2 className={styles.creatorName}>Laura wilson</h2>
                        <div className={styles.location}>
                            <LocationIcon />
                            <span>Lagos, Nigeria</span>
                        </div>
                    </div>
                </div>
                <button 
                    className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                    onClick={handleFollowClick}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
            </div>

            <div className={styles.recipeStats}>
                <div className={styles.stat}>
                    <ServeIcon />
                    <span>1 serve</span>
                </div>
                <div className={styles.stat}>
                    <span>10 Items</span>
                </div>
            </div>

            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'Ingrident' ? styles.active : ''}`}
                    onClick={() => handleTabClick('Ingrident')}
                >
                    Ingrident
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'Procedure' ? styles.active : ''}`}
                    onClick={() => handleTabClick('Procedure')}
                >
                    Procedure
                </button>
            </div>

            {activeTab === 'Ingrident' && (
                <div className={styles.ingredientsList}>
                    <div className={styles.ingredientItem}>
                        <div className={styles.ingredientImage}>
                            <img src="/assets/figma_image_100_2375.png" alt="Tomatos" />
                        </div>
                        <div className={styles.ingredientInfo}>
                            <span className={styles.ingredientName}>Tomatos</span>
                            <span className={styles.ingredientAmount}>500g</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipe;
