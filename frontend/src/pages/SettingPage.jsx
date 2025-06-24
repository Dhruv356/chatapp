import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { themes } from '../Theme';

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Theme Settings</h1>
      <p style={styles.subtext}>Select a color theme for your app:</p>

      <div style={styles.options}>
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            style={{
              ...styles.button,
              backgroundColor: t.background,
              color: t.text,
              borderColor: theme === key ? t.primary : 'transparent',
              outline: theme === key ? `2px solid ${t.primary}` : 'none',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(4px)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '1rem',
    color: '#a3a3ab',
    marginBottom: '2rem',
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '1rem',
    width: '150px',
    borderRadius: '8px',
    border: '2px solid transparent',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Settings;
