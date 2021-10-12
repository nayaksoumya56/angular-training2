import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import Drawflow from "drawflow";
import { ContextMenuComponent } from "ngx-contextmenu";

@Component({
  selector: "app-drawflow",
  templateUrl: "./drawflow.component.html",
  styleUrls: ["./drawflow.component.scss"],
})
export class DrawflowComponent implements OnInit, AfterViewInit {
  constructor() {}

  public drawFlowEditor: any;
  public contextMenuActions = [
    {
      name: "delete",
      enabled: true,
    },
    {
      name: "cut",
      enabled: true,
    },
    {
      name: "copy",
      enabled: true,
    },
    {
      name: "paste",
      enabled: false,
    },
  ];

  @ViewChild(ContextMenuComponent, { static: true })
  public basicMenu: ContextMenuComponent;
  @ViewChild("drawflow", { static: true }) drawflow: ElementRef;
  showMessage(message: any) {
    console.log(message);
  }
  ngOnInit() {
    const container = document.getElementById("drawflow");
    const editor = new Drawflow(container);
    this.drawFlowEditor = editor;
  }
  ngAfterViewInit() {
    this.drawFlowEditor.reroute = true;
    this.drawFlowEditor.reroute_fix_curvature = true;
    this.drawFlowEditor.curvature = 0.5;
    this.drawFlowEditor.start();

    const data = {
      "3": {
        id: 3,
        name: "facebook",
        data: {},
        class: "facebook",
        html: `\n\nFacebook Message\n\n`,
        inputs: {},
        outputs: {},
        pos_x: 900,
        pos_y: 150,
      },
      "4": {
        id: 4,
        name: "log",
        data: {},
        class: "log",
        html: `\n\nSave log file\n\n`,
        inputs: {},
        outputs: {},
        pos_x: 1300,
        pos_y: 200,
      },
    };

    this.drawFlowEditor.addNode("foo", 1, 1, 100, 200, "foo", data, "Foo");
    this.drawFlowEditor.addNode("bar", 1, 1, 500, 100, "bar", data, "Bar A");
    this.drawFlowEditor.addNode("bar", 1, 1, 500, 300, "bar", data, "Bar B");
    this.drawFlowEditor.addNode(
      data[3].name,
      1,
      1,
      data[3].pos_x,
      data[3].pos_y,
      data[3].class,
      data,
      data[3].html
    );
    this.drawFlowEditor.addNode(
      data[4].name,
      1,
      1,
      data[4].pos_x,
      data[4].pos_y,
      data[4].class,
      data,
      data[4].html
    );

    this.drawFlowEditor.addConnection(1, 2, "output_1", "input_1");
    this.drawFlowEditor.addConnection(1, 3, "output_1", "input_1");
    this.drawFlowEditor.addConnection(1, 4, "output_1", "input_1");
    this.drawFlowEditor.addConnection(2, 4, "output_1", "input_1");
    this.drawFlowEditor.addConnection(4, 5, "output_1", "input_1");
    this.drawFlowEditor.addConnection(3, 5, "output_1", "input_1");

    // this.drawFlowEditor.on("keydown", (event:any) => {
    //   console.log(event);

    // });
    // this.drawFlowEditor.on("click", (event:any) => {
    //   console.log(event);

    // });
    // this.drawFlowEditor.on("nodeSelected", (id:number) => {
    //   console.log(this.drawFlowEditor.getNodeFromId(id));
    // });
    this.drawFlowEditor.on("contextmenu", (event: any) => {});
  }
}
