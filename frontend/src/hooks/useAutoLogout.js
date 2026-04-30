/**
 * useAutoLogout
 *
 * Automatically logs out the admin/user when:
 *  1. The app has been idle (no touch interaction) for IDLE_TIMEOUT_MS
 *  2. The app is sent to the background / off-screen (AppState becomes 'background' or 'inactive')
 *
 * Usage: Call inside a component that wraps the authenticated area.
 *        Pass the signOut function from AuthContext.
 *
 * Timeouts:
 *   IDLE_TIMEOUT_MS       – logout after this many ms of zero interaction  (default: 10 min)
 *   BACKGROUND_GRACE_MS   – logout after this many ms in background        (default: 2 min)
 */

import { useEffect, useRef, useCallback } from 'react';
import { AppState, PanResponder } from 'react-native';

const IDLE_TIMEOUT_MS     = 10 * 60 * 1000;  // 10 minutes idle → logout
const BACKGROUND_GRACE_MS = 0;               // 0ms → instant logout when app goes off-screen

export function useAutoLogout(signOut, isLoggedIn) {
  const idleTimerRef       = useRef(null);
  const backgroundTimerRef = useRef(null);
  const appStateRef        = useRef(AppState.currentState);

  // ─── Idle timer ──────────────────────────────────────────────────────────────
  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (!isLoggedIn) return;
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      console.log('[AutoLogout] Idle timeout reached – signing out');
      signOut();
    }, IDLE_TIMEOUT_MS);
  }, [isLoggedIn, signOut, clearIdleTimer]);

  // ─── Background timer ────────────────────────────────────────────────────────
  const clearBackgroundTimer = useCallback(() => {
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current);
      backgroundTimerRef.current = null;
    }
  }, []);

  // ─── AppState listener ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn) {
      clearIdleTimer();
      clearBackgroundTimer();
      return;
    }

    // Start idle timer as soon as user is logged in
    resetIdleTimer();

    const handleAppStateChange = (nextState) => {
      const prevState = appStateRef.current;
      appStateRef.current = nextState;

      if (
        (prevState === 'active') &&
        (nextState === 'background' || nextState === 'inactive')
      ) {
        // App went off-screen → start grace timer
        console.log('[AutoLogout] App backgrounded – grace timer started');
        backgroundTimerRef.current = setTimeout(() => {
          console.log('[AutoLogout] Background grace period expired – signing out');
          signOut();
        }, BACKGROUND_GRACE_MS);
      }

      if (nextState === 'active') {
        // App came back to foreground → cancel background timer, reset idle timer
        console.log('[AutoLogout] App foregrounded – timers reset');
        clearBackgroundTimer();
        resetIdleTimer();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      clearIdleTimer();
      clearBackgroundTimer();
    };
  }, [isLoggedIn, signOut, resetIdleTimer, clearIdleTimer, clearBackgroundTimer]);

  // ─── PanResponder (captures every touch to reset idle timer) ─────────────────
  // We return this so the caller can spread it onto a root PanResponder wrapper.
  const panResponder = useRef(
    PanResponder.create({
      // Respond to every touch but don't consume it
      onStartShouldSetPanResponderCapture: () => {
        resetIdleTimer();
        return false; // don't block children
      },
      onMoveShouldSetPanResponderCapture: () => {
        resetIdleTimer();
        return false;
      },
    })
  ).current;

  return { panResponder, resetIdleTimer };
}
