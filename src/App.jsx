import React from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Results from './components/Results';
import PUSH_SEARCH_RESULT from './actions/actions';

const options = {
  shouldSort: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name'],
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export function AppComponent({ dispatch, data, selectedCompany, fuse }) {
  const classes = useStyles();
  const dispatchResult = result => {
    const company = data.filter(val => val.name === result).shift();
    dispatch({ type: PUSH_SEARCH_RESULT, payload: [company] });
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main>
        <SearchBar setResult={dispatchResult} fuse={fuse} />
        <Results selectedCompany={selectedCompany} />
      </main>
      <Footer />
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
AppComponent.propTypes = {
  data: PropTypes.array.isRequired,
  selectedCompany: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  fuse: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { data, selectedCompany } = state;
  return { data, selectedCompany, fuse: new Fuse(data, options) };
};

export const App = connect(
  mapStateToProps,
  null,
)(AppComponent);
