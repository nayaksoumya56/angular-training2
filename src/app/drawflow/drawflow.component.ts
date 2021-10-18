import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import Drawflow from "drawflow";

@Component({
  selector: "app-drawflow",
  templateUrl: "./drawflow.component.html",
  styleUrls: ["./drawflow.component.scss"],
})
export class DrawflowComponent implements OnInit, AfterViewInit {
  outputClass: string = "output_1";
  inputClass: string = "input_1";
  selectedNodes: any[];
  clipboard: any[];
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

  addSelectedToClassList(data: any[]) {
    data.forEach((element: any) => {
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

  unSelectAllNodes(data: any[]) {
    console.log("unselect -> ", data);
    document.querySelectorAll(".drawflow-node").forEach((el) => {
      const selectedIds = data.map((ele) => ele.elementData.id);
      if (!selectedIds.includes(el.id)) {
        el.classList.remove("selected-node");
      }
    });
  }

  ngOnInit() {
    const container = document.getElementById("drawflow");
    const editor = new Drawflow(container);
    this.drawFlowEditor = editor;
    this.selectedNodes = [];
  }
  ngAfterViewInit() {
    this.drawFlowEditor.editor_mode = "edit";
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

    this.drawFlowEditor.addConnection(1, 2, this.outputClass, this.inputClass);
    this.drawFlowEditor.addConnection(1, 3, this.outputClass, this.inputClass);
    // this.drawFlowEditor.addConnection(1, 4, this.outputClass, this.inputClass);
    this.drawFlowEditor.addConnection(2, 4, this.outputClass, this.inputClass);
    this.drawFlowEditor.addConnection(3, 4, this.outputClass, this.inputClass);
    // this.drawFlowEditor.addConnection(3, 5, this.outputClass, this.inputClass);
    this.drawFlowEditor.addConnection(4, 5, this.outputClass, this.inputClass);

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
    this.drawFlowEditor.on("nodeUnselected", () =>
      this.unSelectAllNodes(this.selectedNodes)
    );

    // Ctrl+Click Functionality
    this.drawFlowEditor.on("click", (event: any) => {
      console.log("click -> ", event);
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
        this.unSelectAllNodes([]);
      }
      console.log("Selected Nodes -> ", this.selectedNodes);
    });

    // Ctrl+C or Copy Functionality
    this.drawFlowEditor.on("keydown", (event: any) => {
      console.log("Clipboard -> ", this.clipboard);
      if (event.code === "KeyC" && event.ctrlKey && this.selectedNodes.length) {
        this.clipboard = this.selectedNodes;
      }
    });
    // Ctrl+V or Paste Functionality
    this.drawFlowEditor.on("keydown", (event: any) => {
      console.log("Clipboard -> ", this.clipboard);
      const clipboardNodeIds =
        this.clipboard && this.clipboard.length
          ? this.clipboard.map((xEle) => String(xEle.nodeData.id))
          : [];
      const numberOfTotalNodesBeforeCopy = Array.from(
        document.querySelectorAll(".drawflow-node")
      ).length;
      if (
        event.code === "KeyV" &&
        event.ctrlKey &&
        this.clipboard &&
        this.clipboard.length
      ) {
        // Add Node
        this.clipboard.forEach((clipEl: any, clipElIdx: number) => {
          let ele = clipEl.nodeData;
          this.drawFlowEditor.addNode(
            ele.name,
            1,
            1,
            ele.pos_x + 100,
            ele.pos_y + 100,
            ele.class,
            this.clipboard,
            ele.html
          );
        });
        // Add Connection
        this.clipboard.forEach((clipEl: any, clipElIdx: number) => {
          let ele = clipEl.nodeData;
          if (
            ele.outputs &&
            ele.outputs.hasOwnProperty(this.outputClass) &&
            ele.outputs[this.outputClass].connections &&
            ele.outputs[this.outputClass].connections.length
          ) {
            ele.outputs[this.outputClass].connections.forEach(
              (connectionEle: any) => {
                if (clipboardNodeIds.includes(connectionEle.node)) {
                  this.drawFlowEditor.addConnection(
                    Number(numberOfTotalNodesBeforeCopy + clipElIdx + 1),
                    Number(
                      numberOfTotalNodesBeforeCopy +
                        clipboardNodeIds.indexOf(connectionEle.node) +
                        1
                    ),
                    this.outputClass,
                    this.inputClass
                  );
                }
              }
            );
          }
        });
      }
    });
  }
}
