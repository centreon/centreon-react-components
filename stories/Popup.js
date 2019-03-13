import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Popup,
  IconClose,
  Slider,
  MessageInfo,
  Title,
  Subtitle,
  Button,
  HorizontalLine,
  Description,
  MessageError,
  LoaderContent
} from "../src";

storiesOf("Popup", module).add(
  "Popup - small",
  () => (
    <Popup popupType="small">
      <div class="popup-header">
        <h3>Popup Header</h3>
      </div>
      <div class="popup-body">
        <p>Popup body</p>
      </div>
      <div className="popup-footer">
        <p>Popup footer</p>
      </div>
      <IconClose iconType="middle" />
    </Popup>
  ),
  { notes: "A very simple component" }
);

storiesOf("Popup", module).add(
  "Popup - small with header and footer colored",
  () => (
    <Popup popupType="small scroll host">
      <div className="popup-header blue">
        <h3 className="popup-header-title">Popup Header</h3>
      </div>
      <div className="popup-body">
        <LoaderContent />
      </div>
      <div className="popup-footer">
        <MessageError
          messageError="red"
          text="Generation of configuration has failed, please try again."
        />
      </div>
      <IconClose iconType="middle" />
    </Popup>
  ),
  { notes: "A very simple component" }
);

storiesOf("Popup", module).add(
  "Popup - with scroll",
  () => (
    <Popup popupType="small scroll">
      <div class="popup-header blue">
        <h3 className="popup-header-title">Popup Header</h3>
      </div>
      <div class="popup-body">
        <p className="description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis faucibus tellus. Phasellus in felis sed elit hendrerit facilisis eget sollicitudin ante. Mauris suscipit porttitor semper. Aenean laoreet risus diam, in aliquam ante laoreet in. Nulla mollis velit dolor, vitae sagittis eros auctor in. Phasellus id tincidunt lacus, et elementum eros. Phasellus id commodo risus. Quisque sagittis cursus eros et ornare.
        Aenean at magna arcu. Curabitur fringilla eu quam et aliquet. Nam sed libero semper, pellentesque justo sit amet, tempus sapien. Donec viverra nisi at sapien semper hendrerit. Nunc sed fermentum dolor, at varius leo. Donec ullamcorper dui at tincidunt facilisis. Praesent a pretium nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="popup-footer">
        <MessageError
          messageError="red"
          text="Generation of configuration has failed, please try again."
        />
      </div>
      <IconClose iconType="middle" />
    </Popup>
  ),
  { notes: "A very simple component" }
);

storiesOf("Popup", module).add(
  "Popup - big",
  () => (
    <Popup popupType="big">
      <div className="popup-header">
        <h3>Popup Header</h3>
      </div>
      <div className="popup-body">
        <p>Popup body</p>
      </div>
      <div className="popup-footer">
        <p>Popup footer</p>
      </div>
      <IconClose iconType="big" />
    </Popup>
  ),
  { notes: "A very simple component" }
);

storiesOf("Popup Extensions Info", module).add(
  "Popup - big",
  () => (
    <Popup popupType="big">
      <Slider images={["https://res.cloudinary.com/dezez0fsn/image/upload/v1549874437/slider-default-image.png", "https://static.centreon.com/wp-content/uploads/2018/09/plugin-banner-it-operatio" + "ns-management.png", "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg", "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg", "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg"]} />
      <div className="popup-header">
        <Title label="Nom de Module" />
        <Subtitle label="by Centreon" />
        <Button label={"Available 3.1.5"} buttonType="regular" color="blue" />
        <Button
          label="Stable"
          buttonType="bordered"
          color="gray"
          style={{ margin: "15px" }}
        />
        <Button
          label="Expire 12/08/2018"
          buttonType="bordered"
          color="orange"
        />
      </div>
      <HorizontalLine />
      <div className="popup-body">
        <Description date="Last update 12/7/2018" />
        <Description title="Description:" />
        <Description text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        <Description text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        <Description text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      </div>
      <HorizontalLine />
      <div className="popup-footer">
        <Description note="Release note of v 3.11.5 available here >" />
      </div>
      <IconClose iconType="big" />
    </Popup>
  ),
  { notes: "A very simple component" }
);

storiesOf("Popup Extensions Delete", module).add(
  "Popup - small",
  () => (
    <Popup popupType="small">
      <div className="popup-header">
        <Title label="Engine-status" icon="object" />
      </div>
      <div className="popup-body">
        <MessageInfo
          messageInfo="red"
          text="Do you want to delete this extension. This, action will remove all associated data."
        />
      </div>
      <div className="popup-footer">
        <div className="container__row">
          <div className="container__col-xs-6">
            <Button
              label="Delete"
              buttonType="regular"
              color="red"
              iconActionType="delete-white"
            />
          </div>
          <div className="container__col-xs-6 text-right">
            <Button label="Cancel" buttonType="regular" color="gray" />
          </div>
        </div>
      </div>
      <IconClose iconType="middle" />
    </Popup>
  ),
  { notes: "A very simple component" }
);
