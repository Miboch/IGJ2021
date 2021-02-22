import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})

export class ChangelogComponent implements OnInit {
  changes: { [key: string]: string[] } = {}


  constructor() {
    this.setChangelog();
  }

  ngOnInit(): void {
  }


  setChangelog() {
    this.changes = {
      "0.0.3": [
        "Added login system",
        "Added satellite sprite",
        "Added drill sprite"
      ],
      "0.0.2": [
        "setup host domain",
        "added contributors file",
        "added api proxy for easier testing",
        "vastly expanded on library of UI capabilities",
        "added page to browse submitted feedback",
        "prepared project structure for the game"
      ],
      "0.0.1": [
        "Created project",
        "Setup development environment",
        "Added ability to submit feedback",
        "Added toast notifications to the UI capabilities"
      ],

    };


  }
}
