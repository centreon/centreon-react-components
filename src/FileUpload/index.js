import React, { Component } from "react";
import Button from "../Button/ButtonRegular";
import Popup from "../Popup";
import FileUploadItem from "./FileUploadItem";
import FileUploadProgress from "./FileUploadProgress";
import "./file-upload.scss";
import Files from "react-files";

class FileUpload extends Component {
  state = {
    files: []
  };

  onFilesChange = files => {
    this.setState({
      files
    });
  };

  onFilesError = error => {
    console.log("error code " + error.code + ": " + error.message);
  };

  onRemoveFile = idx => {
    let { files } = this.state;
    files.splice(idx, 1);
    this.setState({
      files
    });
  };

  render() {
    const { files } = this.state;
    const {
      onClose,
      uploading,
      onApply,
      uploadingProgress,
      finished
    } = this.props;
    return (
      <React.Fragment>
        <Popup popupType="small">
          <div className="popup-header blue-background-decorator">
            <div className="container__row">
              <div className="container__col-xs-6 center-vertical">
                <div className="file file-upload">
                  <span className="file-upload-title">
                    <span className="file-upload-icon" />
                    File Upload
                  </span>
                </div>
              </div>
              <Files
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={[".zip", ".license"]}
                multiple
                maxFiles={5}
                maxFileSize={1048576}
                minFileSize={0}
                clickable
              >
                <div className="container__col-xs-6 text-right">
                  <Button buttonType="bordered" color="white" label="BROWSE" />
                </div>
              </Files>
            </div>
            <span className="icon-close icon-close-middle" onClick={onClose} />
          </div>
          {files.length > 0 ? (
            <div className="popup-body">
              <div className="file file-upload">
                <div className="file-upload-items">
                  {files.map((file, idx) => (
                    <FileUploadItem
                      icon="file"
                      iconStatus="warning"
                      title={file.name}
                      titleStatus="warning"
                      info={file.sizeReadable}
                      onDeleteFile={() => {
                        this.onRemoveFile(idx);
                      }}
                      uploading={uploading}
                    />
                  ))}
                  {uploading ? (
                    <FileUploadProgress
                      title="Progress"
                      titleStatus="percentage"
                      progressBar="percentage"
                      uploadedPercentage={uploadingProgress}
                    />
                  ) : null}
                </div>
                {uploading && finished ? (
                  <Button
                    label={"Ok"}
                    buttonType="regular"
                    customClass="mr-2 float-right"
                    color="green"
                    onClick={onClose}
                  />
                ) : null}
                {!uploading ? (
                  <Button
                    label={"Apply"}
                    buttonType="regular"
                    customClass="mr-2 float-right"
                    color="green"
                    onClick={() => {
                      onApply(files);
                    }}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </Popup>
      </React.Fragment>
    );
  }
}

export default FileUpload;
