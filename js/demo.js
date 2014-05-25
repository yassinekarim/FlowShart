 jsPlumb.ready(function() {

        var instance = window.instance =jsPlumb.getInstance({
            // default drag options
            DragOptions : { cursor: 'pointer', zIndex:2000 },
            // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
            // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
            ConnectionOverlays : [
            [ "Arrow", { location:1 ,width:10,length:10} ],
            [ "Label", { 
                location:0.1,
                id:"label",
                cssClass:"aLabel"
            }]
            ],
            Container:"flowchart"
        });

        window.setZoom = function(z, el) {
            var p = [ "webkit", "moz", "ms", "o", "" ],
            s = "scale(" + z + ")";

            for (var i = 0; i < p.length; i++)
                el.style[p[i] + "Transform"] = s;

            instance.setZoom(z);    
        };

        // this is the paint style for the connecting lines..
        var connectorPaintStyle = {
            lineWidth:1,
            strokeStyle:"#61B7CF",
            joinstyle:"round",
            outlineColor:"white",
            outlineWidth:2
        },
        // .. and this is the hover style. 
        connectorHoverStyle = {
            lineWidth:4,
            strokeStyle:"#216477",
            outlineWidth:2,
            outlineColor:"white"
        },
        endpointHoverStyle = {
            fillStyle:"#216477",
            strokeStyle:"#216477"
        },
        // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint:"Dot",
            paintStyle:{ 
                strokeStyle:"#61B7CF",
                fillStyle:"transparent",
                radius:3,
                lineWidth:1 
            },              
            isSource:true,
            connector:[ "Flowchart", { stub:[40, 60], gap:5, cornerRadius:4, alwaysRespectStubs:true } ],                                              
            connectorStyle:connectorPaintStyle,
            hoverPaintStyle:endpointHoverStyle,
            connectorHoverStyle:connectorHoverStyle,
            dragOptions:{},
            
            
        },       
        // the definition of target endpoints (will appear when the user drags a connection) 
        targetEndpoint = {
            endpoint:"Dot",                 
            paintStyle:{ fillStyle:"#61B7CF",radius:3},
            hoverPaintStyle:endpointHoverStyle,
            maxConnections:-1,
            dropOptions:{ hoverClass:"hover", activeClass:"active" },
            isTarget:true,    
            
        },          
        init = function(connection) {           
            //connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
            connection.bind("editCompleted", function(o) {
                if (typeof console != "undefined")
                    console.log("connection edited. path is now ", o.path);
            });
        };          

        var _addEndpoints = function(toId, sourceAnchors, targetAnchors) {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                instance.addEndpoint("flowchart" + toId, sourceEndpoint, { anchor:sourceAnchors[i], uuid:sourceUUID });                     
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor:targetAnchors[j], uuid:targetUUID });                     
            }
        };

        // suspend drawing and initialise.
        instance.doWhileSuspended(function() {

//          _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);         
    //      _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
  //          _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
    //        _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);

            // listen for new connections; initialise them the same way we initialise the connections at startup.
            instance.bind("connection", function(connInfo, originalEvent) { 
                init(connInfo.connection);
            });         

            // make all the window divs draggable                        

            // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector 
            // method, or document.querySelectorAll:
            //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });
            instance.bind("click", function(connector, originalEvent) { 
                confirm("ok")
            });
            // connect a few up
           // instance.connect({uuids:["Window2BottomCenter", "Window3TopCenter"], editable:true});
           // instance.connect({uuids:["Window2LeftMiddle", "Window4LeftMiddle"], editable:true});
            //instance.connect({uuids:["Window4TopCenter", "Window4RightMiddle"], editable:true});
           // instance.connect({uuids:["Window3RightMiddle", "Window2RightMiddle"], editable:true});
           // instance.connect({uuids:["Window4BottomCenter", "Window1TopCenter"], editable:true});
            //instance.connect({uuids:["Window3BottomCenter", "Window1BottomCenter"], editable:true});
            //
            
            //
            // listen for clicks on connections, and offer to delete connections on click.
            //
            instance.bind("click", function(conn, originalEvent) {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                    jsPlumb.detach(conn); 
            }); 
            
            instance.bind("connectionDrag", function(connection) {
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });     
            
            instance.bind("connectionDragStop", function(connection) {
                console.log("connection " + connection.id + " was dragged");
            });

            instance.bind("connectionMoved", function(params) {
                console.log("connection " + params.connection.id + " was moved");
            });
        });
function setSelected(element){
    var input=$("#detailEtape");
    input.attr("selectedElement",element)

}

var compteur=1;
instance.draggable($(".flowchart-demo .window"), { grid: [20, 20] });     
$(".tache").draggable({
    helper : 'clone'
});
$(".xor").draggable({
    helper : 'clone'
});
$(".start").draggable({
    helper : 'clone'
});
$(".stop").draggable({
    helper : 'clone'
});
$(".fleche").draggable({
    helper : 'clone'
});
$(".deposer").resizable();
$(".deposer")
.droppable(
{
accept : ".tache,.start,.stop,.xor",
drop : function(event, ui) {
    if (ui.draggable.hasClass('tache')) {
        var dropped = $('<div style="position:absolute;left:'
            + (ui.position.left - 100)
            + 'px ;top:'
            + (ui.position.top)
            + 'px;" class="window" id="flowchartwindow'+compteur+'"  test=""></div>');

                                    //dropped.draggable();
                                    dropped.resizable({
                                      resize: function( event, ui ) {instance.repaintEverything();}
                                  });
                                    $(this).append(dropped);
                                    instance.draggable($("#flowchartwindow"+compteur),{ grid: [20, 20] });  
                                    _addEndpoints("window"+compteur,  ["TopCenter", "RightMiddle"],["LeftMiddle", "BottomCenter"]);
                                    compteur++;
                                } else if (ui.draggable.hasClass('start')) {
                                    var dropped = $('<div style="position:absolute;left:'
                                        + (ui.position.left - 100)
                                        + 'px ;top:'
                                        + (ui.position.top)
                                        + 'px;"    id="flowchartstart'+compteur+'" class="start2"></div>');
                                   // dropped.draggable();
                                   $(this).append(dropped);
                                   instance.draggable($("#flowchartstart"+compteur),{ grid: [20, 20] }); 
                                   $("#flowchartstart"+compteur).click(
 function(){
      // to repaint the connections and endpoints
    //followed by your code
    var box=$( this );
    var id=box.attr('id');
    setSelected(id);
    var inputNom=$("#inputNom");
    var inputDateDebut=$("#inputdateDebut");
    var inputDateFin=$("#inputdateFin");
    inputNom.prop("value","");
    inputNom.prop("value",box.attr("nom"));
    inputDateFin.prop("value","");
    inputDateFin.prop("value",box.attr("dateFin"));
    inputDateDebut.prop("value","");
    inputDateDebut.prop("value",box.attr("dateDebut"));
}
);
                                    $("#flowchartstart"+compteur).click();
                                 //  instance.draggable($("#flowchartstart"+compteur),{ grid: [20, 20] });  
                                   /*$("#flowchartstart"+compteur).draggable(
                                    {
                                        drag: function(){
                                        
                                       // instance.repaintEverything();
                                        $(this).setSelected();
                                        var input=$("#detailEtape");
                                        input[0]=$(this).getAttribute("test");
                                    }
                                    });*/
                                   _addEndpoints("start"+compteur, ["RightMiddle" ],[] );
                                   compteur++;
                               } else if (ui.draggable.hasClass('stop')) {
                                var dropped = $('<div style="position:absolute;left:'
                                    + (ui.position.left - 100)
                                    + 'px ;top:'
                                    + (ui.position.top)
                                    + 'px;"    id="flowchartstop'+compteur+'" class="stop2"></div>');
                                   // dropped.draggable();
                                   $(this).append(dropped);

                                   instance.draggable($("#flowchartstop"+compteur),{ grid: [20, 20] });  
                                   _addEndpoints("stop"+compteur, [ ],["LeftMiddle"] );
                                   compteur++;
                               }else if (ui.draggable.hasClass('xor')) {
                                var dropped = $('<div style="position:absolute;left:'
                                    + (ui.position.left - 100)
                                    + 'px ;top:'
                                    + (ui.position.top)
                                    + 'px;"    id="flowchartxor'+compteur+'" class="xor2"><div class ="cross"/></div>');
                                   // dropped.draggable();
                                   $(this).append(dropped);

                                   instance.draggable($("#flowchartxor"+compteur),{ grid: [20, 20] });  
                                   _addEndpoints("xor"+compteur, [ "TopCenter", "BottomCenter"],["LeftMiddle"] );
                                   compteur++;
                               }

                           
                        //$(ui.draggable).clone();
                    }

                });


function saveFlowchart(){
    var nodes = []
    $(".node").each(function (idx, elem) {
        var $elem = $(elem);
        var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
        console.log('endpoints of '+$elem.attr('id'));
        console.log(endpoints);
        nodes.push({
            blockId: $elem.attr('id'),
            nodetype: $elem.attr('data-nodetype'),
            positionX: parseInt($elem.css("left"), 10),
            positionY: parseInt($elem.css("top"), 10)
        });
    });
    var connections = [];
    $.each(jsPlumb.getConnections(), function (idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId
        });
    });
    
    var flowChart = {};
    flowChart.nodes = nodes;
    flowChart.connections = connections;
    flowChart.numberOfElements = numberOfElements;
    
    var flowChartJson = JSON.stringify(flowChart);
    //console.log(flowChartJson);
    
    $('#jsonOutput').val(flowChartJson);
}
function loadFlowchart(){
    var flowChartJson = $('#jsonOutput').val();
    var flowChart = JSON.parse(flowChartJson);
    var nodes = flowChart.nodes;
    $.each(nodes, function( index, elem ) {
        if(elem.nodetype === 'startpoint'){
            repositionElement('startpoint', elem.positionX, elem.positionY);
        }else if(elem.nodetype === 'endpoint'){
            repositionElement('endpoint', elem.positionX, elem.positionY);
        }else if(elem.nodetype === 'task'){
            var id = addTask(elem.blockId);
            repositionElement(id, elem.positionX, elem.positionY);
        }else if(elem.nodetype === 'decision'){
            var id = addDecision(elem.blockId);
            repositionElement(id, elem.positionX, elem.positionY);
        }else{

        }
    });

    var connections = flowChart.connections;
    $.each(connections, function( index, elem ) {
       var connection1 = jsPlumb.connect({
        source: elem.pageSourceId,
        target: elem.pageTargetId,
        anchors: ["BottomCenter", [0.75, 0, 0, -1]]

    });
   });
    
    numberOfElements = flowChart.numberOfElements;
}
function repositionElement(id, posX, posY){
    $('#'+id).css('left', posX);
    $('#'+id).css('top', posY);
    jsPlumb.repaint(id);
}
});