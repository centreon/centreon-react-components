import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    labelWidth: 4,
    name: "name",
    activeForm: false,
    activePreviewButton: false,
    activeSaveButton: false,
    fields: [
      {
        id: 1,
        placeholder: 'Select \"Inclusion\" in the list of operations',
        input_type: 'dropdown',
        values: [
          "Inclusion 1",
          "Inclusion 2",
          "Inclusion 3",
          "Inclusion 4"
        ],
        forId: 'id1',
        required: true
      },
      {
        id: 2,
        placeholder: 'Select source property',
        input_type: 'dropdown',
        values: [
          "Source 1",
          "Source 2",
          "Source 3",
          "Source 4"
        ],
        forId: 'id2',
        required: true
      },
      {
        id: 3,
        placeholder: 'Define regex pattern',
        input_type: 'dropdown',
        values: [
          "Regex 1",
          "Regex 2",
          "Regex 3",
          "Regex 4"
        ],
        forId: 'id3',
        required: true
      },
    ]
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { fields} = this.state;

    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
        {fields.map(form => {
            return (
                <div  key={form.id}>
                    <InputLabel
                        ref={ref => {
                        this.InputLabelRef = ref;
                        }}
                        htmlFor={form.forid}
                    >
                        {form.placeholder}
                    </InputLabel>
                    <Select
                        native
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        name={form.name}
                        input={
                        <OutlinedInput
                            name="age"
                            labelWidth={this.state.labelWidth}
                            id={form.forid}
                        />
                        }
                    >
                        <option value="" />
                        <option value={form.values[0]}>{form.values[0]}</option>
                        <option value={form.values[1]}>{form.values[1]}</option>
                        <option value={form.values[2]}>{form.values[2]}</option>
                    </Select>

            </div>
            )
        } )}
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);