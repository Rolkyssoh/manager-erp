import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link, Routes } from 'react-router-dom';
import { EntryRoutesPage } from '../pages';

export function App() {
  return (
    <EntryRoutesPage />
  );
}

export default App;
