import { Component, OnInit } from "@angular/core";
import { RestApiService } from "src/app/services/rest-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { LiveTerminalFeedDialogComponent } from "src/app/components/live-terminal-feed-dialog/live-terminal-feed-dialog.component";

interface Tile {
  icon: string;
  cols: number;
  rows: number;
  tooltip: string;
  message: string;
  url: string;
}

@Component({
  selector: "app-magic-mirror-control-center",
  templateUrl: "./magic-mirror-control-center.component.html",
  styleUrls: ["./magic-mirror-control-center.component.scss"]
})
export class MagicMirrorControlCenterComponent implements OnInit {
  constructor(
    private api: RestApiService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  private liveTerminalFeedDialogSettings: object = {
    width: "75vw",
    height: "75vh"
  };

  public tiles: Tile[] = [
    {
      icon: "live_tv",
      tooltip: "Start MagicMirror",
      cols: 1,
      rows: 1,
      url: "/start-magicmirror",
      message: "MagicMirror will be started."
    },
    {
      icon: "tv_off",
      tooltip: "Stop MagicMirror",
      cols: 1,
      rows: 1,
      url: "/stop-magicmirror",
      message: "MagicMirror will be stopped."
    },
    {
      icon: "refresh",
      tooltip: "Restart MagicMirror",
      cols: 1,
      rows: 1,
      url: "/restart-magicmirror",
      message: "MagicMirror will be restarted."
    },
    {
      icon: "system_update",
      tooltip: "Upgrade MagicMirror",
      cols: 1,
      rows: 1,
      url: "/upgrade-magicmirror",
      message: "MagicMirror will be upgraded and restarted, if running."
    },
    {
      icon: "power_settings_new",
      tooltip: "Restart RaspberryPi",
      cols: 1,
      rows: 1,
      url: "/restart-raspberrypi",
      message: "Your RaspberryPi will be rebooted."
    },
    {
      icon: "power_off",
      tooltip: "Shutdown RaspberryPi",
      cols: 1,
      rows: 1,
      url: "/shutdown-raspberrypi",
      message: "Your RaspberryPi will be powered off."
    },
  ];

  private snackbarSettings: object = { duration: 5000 };

  private working = () => {
    this.snackbar.open(
      "This may take a moment ...",
      "Close",
      this.snackbarSettings
    );
  };

  private executed = () => {
    this.snackbar.open("Process executed", "Close", this.snackbarSettings);
  };

  private executing = () => {
    this.snackbar.open("Process executing ...", "Close", this.snackbarSettings);
  };

  private magicMirrorRunningAlready = () => {
    this.snackbar.open(
      "MagicMirror appears to be running already. If this is a mistake, stop, then start MagicMirror.",
      "Close",
      this.snackbarSettings
    );
  };

  ngOnInit(): void {}

  public sendControlSignal(url: string, message: string): void {

    const data = {
      height: "15vh",
      width: "33vw",
      data: { message }
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, data);

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) return;

      if (url === "/upgrade-magicmirror") {
        this.dialog.open(LiveTerminalFeedDialogComponent, this.liveTerminalFeedDialogSettings);
      }

      this.api.retrieve(url).subscribe((success) => {
        if (url === "/start-magicmirror") {
          success ? this.working() : this.magicMirrorRunningAlready();
        } else {
          url === "/restart-magicmirror" ? this.working() : this.executed();
        }
      });
    });
  }
}
