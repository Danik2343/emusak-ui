import React from "react";
import "./downloadmanager.css";
import { Button, Grid, IconButton, LinearProgress } from "@mui/material";
import useTranslation from "../../i18n/I18nService";
import useStore from "../../actions/state";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ipcRenderer } from "electron";

const DownloadManagerComponent = () => {
  const [isExpended, setIsExpended] = React.useState(true);
  const { t } = useTranslation();

  const [dlManagerFiles] = useStore(state => [state.dlManagerFiles]);

  if (dlManagerFiles.length === 0) {
    return null;
  }

  return (
    <div className="download-manager">
      <header className="download-manager-title">
        <Button
          fullWidth
          color="info"
          onClick={() => setIsExpended(!isExpended)}
        >
          { t("downloadManager") }
        </Button>
      </header>
      {
        isExpended && (
          <>
            <section className="download-manager-content">
              {
                dlManagerFiles.map(dlFile => (
                  <div className="download-manager-item">
                    <div>
                      <p style={{ margin: 0, marginBottom: 5 }}><small>{dlFile.filename} | {dlFile.downloadSpeed} MB/s</small></p>
                      <Grid style={{ display: "flex", alignItems: "center" }} container spacing={2}>
                        <Grid item xs={10}>
                          <LinearProgress variant="buffer" value={dlFile.progress} valueBuffer={50} />
                        </Grid>
                        <Grid item xs>
                          <IconButton
                            color="error"
                            size="small"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => ipcRenderer.send("cancel-download")}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ))
              }
            </section>
          </>
        )
      }
    </div>
  );
};

export default DownloadManagerComponent;
