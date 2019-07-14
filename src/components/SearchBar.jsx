import React from 'react';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Filters from './Filters';

const onSearch$ = new Subject();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  heroContent: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(8, 0, 6),
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function onSuggestionSelected(dispatch) {
  /* eslint-disable no-unused-vars */
  return (event, { suggestion, suggestionValue }) => {
    dispatch(suggestionValue);
  };
}

export default function SearchBar({ fuse, setResult }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    company: '',
    filters: {
      fintech: false,
      construction: false,
      ecommerce: false,
      software: false,
    },
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const subscription = onSearch$
    .pipe(
      map(val => fuse.search(val)),
      map(companies => {
        return companies.reduce((acc, curr, idx) => {
          if (curr.specialty.filter(spec => state.filters[spec.toLowerCase()]).length) {
            acc.push(curr);
          }
          if (idx === companies.length - 1 && acc.length === 0) {
            const hasFilter = Object.keys(state.filters).reduce(
              (accFilters, currFilter) => accFilters || state.filters[currFilter],
              false,
            );
            return hasFilter ? acc : companies;
          }
          return acc;
        }, []);
      }),
    )
    .subscribe(results => {
      setSuggestions(results);
    });

  React.useEffect(() => {
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    onSearch$.next(inputValue);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const handleFilter = name => event => {
    setState({
      ...state,
      filters: {
        ...state.filters,
        [name]: event.target.checked,
      },
    });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
    onSuggestionSelected: onSuggestionSelected(setResult),
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <div className={classes.root}>
          <Filters stateFilters={state.filters} handleFilter={handleFilter} />
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              id: 'react-autosuggest-simple',
              label: 'Search for a company?',
              placeholder: 'try Cosuno?',
              value: state.company,
              onChange: handleChange('company'),
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </div>
      </Container>
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
SearchBar.propTypes = {
  fuse: PropTypes.object.isRequired,
  setResult: PropTypes.func.isRequired,
};
