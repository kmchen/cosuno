import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Filters({ stateFilters, handleFilter }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={stateFilters.fintech}
            onChange={handleFilter('fintech')}
            value="fintech"
          />
        }
        label="Fintech"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stateFilters.construction}
            onChange={handleFilter('construction')}
            value="construction"
          />
        }
        label="Construction"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stateFilters.ecommerce}
            onChange={handleFilter('ecommerce')}
            value="ecommerce"
          />
        }
        label="Ecommerce"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stateFilters.software}
            onChange={handleFilter('software')}
            value="software"
          />
        }
        label="Software"
      />
    </FormGroup>
  );
}

/* eslint-disable react/forbid-prop-types */
Filters.propTypes = {
  stateFilters: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
