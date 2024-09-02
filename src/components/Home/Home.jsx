import React, { useContext, useState, useEffect, useRef } from 'react';
import { DataContext } from '../../DataContext';
import './Home.css';
import levels from '../../levels';
import { useNavigate } from 'react-router-dom';
import navbarConfig from '../../navbarConfig';

function Home() {
  const navigate = useNavigate();
  const { data, updateData } = useContext(DataContext);
  const [isBomb, setIsBomb] = useState(false);
  const [bombProgress, setBombProgress] = useState(10); // Start countdown from 10
  const [defuseProgress, setDefuseProgress] = useState(0); // For circular defuse timer
  const [explosionVisible, setExplosionVisible] = useState(false); // Control explosion visibility
  const bombTimerRef = useRef(null);
  const [gameTime, setGameTime] = useState('00:00:00');
  const defuseTimerRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    if (data.bombActive && !data.bombDefused) {
      setIsBomb(true);

      const timeSinceBomb = now - data.bombTimestamp;
      setBombProgress(10 - timeSinceBomb); // Countdown from 10

      if (timeSinceBomb >= 10) {
        handleBombExplosion();
      } else {
        bombTimerRef.current = setInterval(() => {
          const updatedTimeSinceBomb = Math.floor(Date.now() / 1000) - data.bombTimestamp;
          const remainingTime = 10 - updatedTimeSinceBomb;
          setBombProgress(remainingTime);

          if (remainingTime <= 0) {
            clearInterval(bombTimerRef.current);
            handleBombExplosion();
          }
        }, 1000);
      }
    }

    return () => clearInterval(bombTimerRef.current); // Cleanup on unmount
  }, [data]);

  const handleBombExplosion = () => {
    setExplosionVisible(true); // Show explosion overlay

    setTimeout(() => {
      updateData({
        money: 0,
        bombDefused: false,
        bombActive: false,
      });
      setIsBomb(false);
      setBombProgress(10);
      setExplosionVisible(false);
    }, 1400);
  };

  const handleBallClick = () => {
    if (!isBomb) {
      updateData({ money: data.money + 1 });

      setClickCount((prevCount) => prevCount + 1);

      if (clickCount === 0) {
        clickTimerRef.current = setTimeout(() => {
          setClickCount(0); // Reset click count after 25 seconds
        }, 25000);
      }

      if (clickCount + 1 > 300) {
        triggerBombAppearance();
      }
    }
  };


  const triggerBombAppearance = () => {
    setIsBomb(true);
    const now = Math.floor(Date.now() / 1000);
    updateData({
      bombTimestamp: now,
      bombDefused: false,
      bombActive: true,
    });
    setClickCount(0);
    clearTimeout(clickTimerRef.current);
  };

  const handleBombDefuseStart = () => {
    if (isBomb) {
      defuseTimerRef.current = setInterval(() => {
        setDefuseProgress((prev) => {
          if (prev < 100) {
            return prev + (100 / 30); // 3 seconds for 100% progress
          } else {
            clearInterval(defuseTimerRef.current);
            handleBombDefused();
            return 100;
          }
        });
      }, 100);
    }
  };

  const handleBombDefuseEnd = () => {
    if (isBomb) {
      clearInterval(defuseTimerRef.current);
      setDefuseProgress(0); // Reset progress if released early
    }
  };

  const handleBombDefused = () => {
    updateData({
      bombDefused: true,
      bombActive: false,
    });
    setIsBomb(false);
    setDefuseProgress(0);
  };

  const handleUpgrade = () => {
    if (data.money >= levels[data.level].upgradeCost) {
      updateData({
        money: data.money - levels[data.level].upgradeCost,
        level: data.level + 1,
      });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = Math.floor((now - data.intialTime));
      if(data.intialTime === 0) {
        updateData({
          intialTime: now
        });
      }
      else{
        //format the time
        const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
        setGameTime(`${hours}:${minutes}:${seconds}`);
        
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);


  const buttonClass = data.money >= levels[data.level].upgradeCost ? 'enabled' : 'disabled';

  // Function to check if the Global Market button should be displayed
  const shouldDisplayMarketButton = () => data.level >= navbarConfig.shop;

  return (
    <div className="home-container">
      
      {explosionVisible && <div className="explosion-overlay" />}

      <h2>{levels[data.level - 1].label}</h2>
      <p>{gameTime}</p>

      {isBomb && (
        <div className="defuse-timer">
          <div className="defuse-progress" style={{ width: `${defuseProgress}%` }} />
        </div>
      )}

      <div
        className="ball-container"
        onMouseDown={isBomb ? handleBombDefuseStart : null}
        onMouseUp={isBomb ? handleBombDefuseEnd : null}
        onTouchStart={isBomb ? handleBombDefuseStart : null}
        onTouchEnd={isBomb ? handleBombDefuseEnd : null}
      >
        <div className="bomb-wrapper">
          <img
            className="ball"
            onClick={handleBallClick}
            src={isBomb ? '/images/bomb.png' : levels[data.level - 1].imageUrl}
            alt={isBomb ? 'Bomb' : 'Ball'}
          />
          {isBomb && (
            <div className="bomb-progress-countdown">
              <span>{bombProgress}</span>
            </div>
          )}
        </div>
      </div>

      <button
        className={buttonClass}
        onClick={handleUpgrade}
        disabled={data.money < levels[data.level].upgradeCost} 
      >
        Upgrade Ball - Cost: ${levels[data.level].upgradeCost}
      </button>

      {shouldDisplayMarketButton() && (
        <button onClick={() => navigate('/shop')}>
          🌟Countrball🌟Casino🌟
        </button>
      )}
      
    </div>
  );
}

export default Home;
