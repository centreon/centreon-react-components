import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconWarning from "@material-ui/icons/Warning";
import IconError from "@material-ui/icons/Error";
import classnames from "classnames";
import InputField from "../../InputField";
import InputFieldMultiSelectNew from "../../InputField/InputFieldMultiSelectNew";
import InputFieldMultiSelect from "../../InputField/InputFieldSelectCustom";
import CustomRow from "../../Custom/CustomRow";
import CustomColumn from "../../Custom/CustomColumn";
import IconInfo from "../../Icon/IconInfo";
import MaterialSwitch from "../Switch";
import ButtonCustom from "../../Button/ButtonCustom";
import { MultiSelectHolder } from "../..";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "700"
  },
  customStyle: {
    margin: "0 !important",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid #bcbdc0",
    borderRadius: "0 !important"
  },
  additionalStyles: {
    display: "block"
  },
  helperStyles: {
    paddingBottom: 0
  },
  containerStyles: {
    padding: "10px 24px 10px 24px"
  }
});

class Accordion extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.containerStyles}>
          <CustomRow>
            <CustomColumn customColumn="md-6">
              <InputField
                placeholder="Add a description"
                type="text"
                name="test"
              />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <InputFieldMultiSelect
                options={[
                  { id: "1", name: "24x7", alias: "Always" },
                  { id: "2", name: "none", alias: "Never" },
                  { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                  { id: "4", name: "workhours", alias: "Work hours" }
                ]}
                customStyle="no-margin"
              />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                <IconInfo iconText="Automatically inherit KPI downtimes" />
              </CustomColumn>
              <FormControlLabel control={<MaterialSwitch />} label="Enable" />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <IconInfo iconText="Display on remote server" />
              <InputFieldMultiSelect
                options={[
                  { id: "1", name: "24x7", alias: "Always" },
                  { id: "2", name: "none", alias: "Never" },
                  { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                  { id: "4", name: "workhours", alias: "Work hours" }
                ]}
              />
            </CustomColumn>
          </CustomRow>
        </div>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Indicator</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classnames(
              classes.additionalStyles,
              classes.helperStyles
            )}
          >
            <CustomRow additionalStyles={["mb-0"]}>
              <CustomColumn customColumn="md-6" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Status calculation method" />
                <InputFieldMultiSelect
                  options={[
                    { id: "1", name: "24x7", alias: "Always" },
                    { id: "2", name: "none", alias: "Never" },
                    { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                    { id: "4", name: "workhours", alias: "Work hours" }
                  ]}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-3" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Warning threshold" />
                <CustomRow additionalStyles={["mt-05", "mb-0"]}>
                  <CustomColumn
                    customColumn="md-3"
                    additionalStyles={["mt-03"]}
                  >
                    <IconWarning style={{ color: "#FF9913" }} />
                  </CustomColumn>
                  <CustomColumn customColumn="md-9">
                    <InputField type="text" name="test" />
                  </CustomColumn>
                </CustomRow>
              </CustomColumn>
              <CustomColumn customColumn="md-3" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Critical threshold" />
                <CustomRow additionalStyles={["mt-05"]}>
                  <CustomColumn
                    customColumn="md-3"
                    additionalStyles={["mt-03"]}
                  >
                    <IconError style={{ color: "#E00B3D" }} />
                  </CustomColumn>
                  <CustomColumn customColumn="md-9">
                    <InputField type="text" name="test" />
                  </CustomColumn>
                </CustomRow>
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectHolder>
              <CustomRow additionalStyles={["mb-0"]}>
                <CustomColumn customColumn="md-12" additionalStyles={["mb-1"]}>
                  <IconInfo iconText="Number of indicators (5)" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 1" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 2" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 3" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 4" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 5" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew multiSelectType={true} />
                </CustomColumn>
              </CustomRow>
            </MultiSelectHolder>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Business View</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectHolder>
              <CustomRow>
                <CustomColumn customColumn="md-12" additionalStyles={["mb-1"]}>
                  <IconInfo iconText="Number of views (5)" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 1" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 2" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 3" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 4" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 5" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew multiSelectType={true} />
                </CustomColumn>
              </CustomRow>
            </MultiSelectHolder>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Notification</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow>
              <CustomColumn customColumn="md-6">
                <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                  <IconInfo iconText="View notifications" />
                </CustomColumn>
                <FormControlLabel control={<MaterialSwitch />} label="Enable" />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="*60 seconds"
                  type="text"
                  name="test"
                  label="Interval"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <IconInfo iconText="Options" />
                <InputFieldMultiSelect
                  options={[
                    { id: "1", name: "24x7", alias: "Always" },
                    { id: "2", name: "none", alias: "Never" },
                    { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                    { id: "4", name: "workhours", alias: "Work hours" }
                  ]}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <IconInfo iconText="Time period" />
                <InputFieldMultiSelect
                  options={[
                    { id: "1", name: "24x7", alias: "Always" },
                    { id: "2", name: "none", alias: "Never" },
                    { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                    { id: "4", name: "workhours", alias: "Work hours" }
                  ]}
                />
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectHolder>
              <CustomRow additionalStyles={["mb-0"]}>
                <CustomColumn customColumn="md-12" additionalStyles={["mb-1"]}>
                  <IconInfo iconText="Number of notifications (2)" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 1" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 2" />
                </CustomColumn>
              </CustomRow>
            </MultiSelectHolder>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography className={classes.heading}>Reporting</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="(0-100%)"
                  type="text"
                  name="test"
                  label="SLA warning percentage thresholds"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="minutes"
                  type="text"
                  name="test"
                  label="SLA warning duration threshold"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="(0-100%)"
                  type="text"
                  name="test"
                  label="SLA critical percentage thresholds"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="minutes"
                  type="text"
                  name="test"
                  label="SLA critical duration threshold"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-12" additionalStyles={["mb-1"]}>
                <IconInfo iconText="Extra reporting time periods used in Centreon BI reports (0)" />
              </CustomColumn>
              <CustomColumn customColumn="md-12">
                <ButtonCustom label="ADD" />
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography className={classes.heading}>Escalation</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectHolder>
              <CustomRow>
                <CustomColumn customColumn="md-12" additionalStyles={["mb-1"]}>
                  <IconInfo iconText="Number of escalations (2)" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 1" />
                </CustomColumn>
                <CustomColumn customColumn="md-6">
                  <InputFieldMultiSelectNew placeholder="BA-CIO-Indicator 2" />
                </CustomColumn>
              </CustomRow>
            </MultiSelectHolder>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography className={classes.heading}>Event handler</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow additionalStyles={["w-100"]}>
              <CustomColumn customColumn="md-6">
                <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                  <IconInfo iconText="View event handler" />
                </CustomColumn>
                <FormControlLabel control={<MaterialSwitch />} label="Enable" />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <IconInfo iconText="Event handler command" />
                <InputFieldMultiSelect
                  options={[
                    { id: "1", name: "24x7", alias: "Always" },
                    { id: "2", name: "none", alias: "Never" },
                    { id: "3", name: "nonworkhours", alias: "Non-Work Hours" },
                    { id: "4", name: "workhours", alias: "Work hours" }
                  ]}
                />
              </CustomColumn>
            </CustomRow>
            <MultiSelectHolder
              isEmpty={true}
              multiSelectLabel="Indicators"
              multiSelectCount="0"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Accordion);
