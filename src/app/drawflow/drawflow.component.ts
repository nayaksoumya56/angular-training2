import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import Drawflow from "drawflow";
import { element } from "protractor";

@Component({
  selector: "app-drawflow",
  templateUrl: "./drawflow.component.html",
  styleUrls: ["./drawflow.component.scss"],
})
export class DrawflowComponent implements OnInit, AfterViewInit {
  selectedNodes: any[];
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

  constructor() {}

  @ViewChild("drawflow", { static: true }) drawflow: ElementRef;

  addSelectedToClassList(data) {
    data.forEach((element) => {
      if (
        !Array.from(element.elementData.classList).includes("selected-node")
      ) {
        document
          .getElementById(element.elementData.id)
          .classList.add("selected-node");
      }
    });
    console.log(this.selectedNodes);
  }

  ngOnInit() {
    const container = document.getElementById("drawflow");
    const editor = new Drawflow(container);
    this.drawFlowEditor = editor;
    this.selectedNodes = [];
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
        pos_y: 200,
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
        pos_y: 300,
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

    // remove class from unselected nodes
    this.drawFlowEditor.on("nodeUnselected", (_id: number) => {
      document.querySelectorAll(".drawflow-node").forEach((el) => {
        const selectedIds = this.selectedNodes.map((ele) => ele.elementData.id);
        if (!selectedIds.includes(el.id)) {
          el.classList.remove("selected-node");
        }
      });
    });

    // Ctrl+Click Functionality
    this.drawFlowEditor.on("click", (event: any) => {
      console.log(event);
      const isCtrlClick = event.ctrlKey;
      let clickedNodeElement = undefined,
        clickedNodeElementId: string = "";
      if (
        event.path.length &&
        event.path.length > 1 &&
        event.path[0].classList.length &&
        event.path[0].classList[0] === "drawflow_content_node"
      ) {
        clickedNodeElement = event.path[1];
      }
      if (
        event.path.length &&
        event.path[0].classList.length &&
        event.path[0].classList[0] === "drawflow-node"
      ) {
        clickedNodeElement = event.path[0];
      }
      if (clickedNodeElement) {
        clickedNodeElementId = String(clickedNodeElement.id).replace(
          "node-",
          ""
        );
      }

      if (clickedNodeElement) {
        document
          .getElementById(clickedNodeElement.id)
          .classList.remove("selected");
        const newNode = this.drawFlowEditor.getNodeFromId(clickedNodeElementId);
        if (
          isCtrlClick &&
          Array.from(clickedNodeElement.classList).includes("selected-node")
        ) {
          // Unselect node
          this.selectedNodes = this.selectedNodes.filter(
            (ele) => String(ele.nodeData.id) !== String(newNode.id)
          );
          clickedNodeElement.classList.remove("selected-node");
          this.addSelectedToClassList(this.selectedNodes);
        } else if (isCtrlClick) {
          // select Node
          this.selectedNodes = [
            ...this.selectedNodes,
            {
              nodeData: newNode,
              elementData: clickedNodeElement,
            },
          ];
          this.addSelectedToClassList(this.selectedNodes);
        } else {
          this.selectedNodes = [
            {
              nodeData: newNode,
              elementData: clickedNodeElement,
            },
          ];
          this.addSelectedToClassList(this.selectedNodes);
        }
      } else {
        // Clicked on Editor
        this.selectedNodes = [];
      }
      console.log(this.selectedNodes);
    });

    // Ctrl+C or Copy Functionality
    this.drawFlowEditor.on("keydown", (event: any) => {
      console.log(event);
    });
  }
}
