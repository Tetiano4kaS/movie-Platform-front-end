import React from 'react';
import styles from './User.module.css';

const UserComponent = () => {
    const userName = "Tetiana";


    return (
        <div className={styles.userContainer}>
            <img src={'girl-avatar.jpg'} alt="User Avatar" className={styles.avatar}/>
            <span className={styles.userName}>{userName}</span>
        </div>
    );
};

export default UserComponent;
