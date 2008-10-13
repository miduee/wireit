var WireIt={getIntStyle:function(B,A){var C=YAHOO.util.Dom.getStyle(B,A);return parseInt(C.substr(0,C.length-2),10)},sn:function(D,C,A){if(!D){return }if(C){for(var B in C){var E=C[B];if(typeof (E)=="function"){continue}if(B=="className"){B="class";D.className=E}if(E!==D.getAttribute(B)){if(E===false){D.removeAttribute(B)}else{D.setAttribute(B,E)}}}}if(A){for(var B in A){if(typeof (A[B])=="function"){continue}if(D.style[B]!=A[B]){D.style[B]=A[B]}}}},cn:function(A,C,B,E){var D=document.createElement(A);this.sn(D,C,B);if(E){D.innerHTML=E}return D},indexOf:YAHOO.lang.isFunction(Array.prototype.indexOf)?function(B,A){return A.indexOf(B)}:function(C,A){for(var B=0;B<A.length;B++){if(A[B]==C){return B}}return -1},compact:YAHOO.lang.isFunction(Array.prototype.compact)?function(A){return A.compact()}:function(A){var C=[];for(var B=0;B<A.length;B++){if(A[B]){C.push(A[B])}}return C}};WireIt.util={};(function(){var A=YAHOO.util.Event,B=YAHOO.env.ua;WireIt.CanvasElement=function(){this.element=document.createElement("canvas");if(typeof (G_vmlCanvasManager)!="undefined"){this.element=G_vmlCanvasManager.initElement(this.element)}};WireIt.CanvasElement.prototype={getContext:function(C){return this.element.getContext(C||"2d")},SetCanvasRegion:B.ie?function(F,E,D,C){WireIt.sn(this.element,null,{left:F+"px",top:E+"px",width:D+"px",height:C+"px"});this.getContext().clearRect(0,0,D,C)}:((B.webkit||B.opera)?function(F,J,C,K){var D=this.element;var H=WireIt.cn("canvas",{className:D.className||D.getAttribute("class"),width:C,height:K},{left:F+"px",top:J+"px"});var I=A.getListeners(D);for(var E in I){var G=I[E];A.addListener(H,G.type,G.fn,G.obj,G.adjust)}A.purgeElement(D);D.parentNode.replaceChild(H,D);this.element=H}:function(F,E,D,C){WireIt.sn(this.element,{width:D,height:C},{left:F+"px",top:E+"px"})})}})();WireIt.Wire=function(D,C,B,A){this.parentEl=B;this.terminal1=D;this.terminal2=C;this.config=A||{};this.config.className=this.config.className||"WireIt-Wire";this.config.coeffMulDirection=YAHOO.lang.isUndefined(this.config.coeffMulDirection)?100:this.config.coeffMulDirection;this.config.drawingMethod=this.config.drawingMethod||"bezier";this.config.cap=this.config.cap||"round";this.config.bordercap=this.config.bordercap||"round";this.config.width=this.config.width||3;this.config.borderwidth=this.config.borderwidth||1;this.config.color=this.config.color||"rgb(173, 216, 230)";this.config.bordercolor=this.config.bordercolor||"#0000ff";WireIt.Wire.superclass.constructor.call(this);this.element.className=this.config.className;this.parentEl.appendChild(this.element);this.terminal1.addWire(this);this.terminal2.addWire(this)};YAHOO.lang.extend(WireIt.Wire,WireIt.CanvasElement,{remove:function(){this.parentEl.removeChild(this.element);if(this.terminal1&&this.terminal1.removeWire){this.terminal1.removeWire(this)}if(this.terminal2&&this.terminal2.removeWire){this.terminal2.removeWire(this)}this.terminal1=null;this.terminal2=null},drawBezierCurve:function(){var O=this.terminal1.getXY();var M=this.terminal2.getXY();var F=this.config.coeffMulDirection;var B=Math.sqrt(Math.pow(O[0]-M[0],2)+Math.pow(O[1]-M[1],2));if(B<F){F=B/2}var C=[this.terminal1.config.direction[0]*F,this.terminal1.config.direction[1]*F];var A=[this.terminal2.config.direction[0]*F,this.terminal2.config.direction[1]*F];var L=[];L[0]=O;L[1]=[O[0]+C[0],O[1]+C[1]];L[2]=[M[0]+A[0],M[1]+A[1]];L[3]=M;var H=[O[0],O[1]];var K=[O[0],O[1]];for(var I=1;I<L.length;I++){var D=L[I];if(D[0]<H[0]){H[0]=D[0]}if(D[1]<H[1]){H[1]=D[1]}if(D[0]>K[0]){K[0]=D[0]}if(D[1]>K[1]){K[1]=D[1]}}var G=[4,4];H[0]=H[0]-G[0];H[1]=H[1]-G[1];K[0]=K[0]+G[0];K[1]=K[1]+G[1];var E=Math.abs(K[0]-H[0]);var N=Math.abs(K[1]-H[1]);this.SetCanvasRegion(H[0],H[1],E,N);var J=this.getContext();for(var I=0;I<L.length;I++){L[I][0]=L[I][0]-H[0];L[I][1]=L[I][1]-H[1]}J.lineCap=this.config.bordercap;J.strokeStyle=this.config.bordercolor;J.lineWidth=this.config.width+this.config.borderwidth*2;J.beginPath();J.moveTo(L[0][0],L[0][1]);J.bezierCurveTo(L[1][0],L[1][1],L[2][0],L[2][1],L[3][0],L[3][1]);J.stroke();J.lineCap=this.config.cap;J.strokeStyle=this.config.color;J.lineWidth=this.config.width;J.beginPath();J.moveTo(L[0][0],L[0][1]);J.bezierCurveTo(L[1][0],L[1][1],L[2][0],L[2][1],L[3][0],L[3][1]);J.stroke()},getOtherTerminal:function(A){return(A==this.terminal1)?this.terminal2:this.terminal1},drawArrows:function(){var h=7;var G=h+3;var V=[4+G,4+G];var E=this.terminal1.getXY();var D=this.terminal2.getXY();var J=Math.sqrt(Math.pow(E[0]-D[0],2)+Math.pow(E[1]-D[1],2));var c=[Math.min(E[0],D[0])-V[0],Math.min(E[1],D[1])-V[1]];var e=[Math.max(E[0],D[0])+V[0],Math.max(E[1],D[1])+V[1]];var K=Math.abs(e[0]-c[0])+G;var T=Math.abs(e[1]-c[1])+G;E[0]=E[0]-c[0];E[1]=E[1]-c[1];D[0]=D[0]-c[0];D[1]=D[1]-c[1];this.SetCanvasRegion(c[0],c[1],K,T);var M=this.getContext();M.lineCap=this.config.bordercap;M.strokeStyle=this.config.bordercolor;M.lineWidth=this.config.width+this.config.borderwidth*2;M.beginPath();M.moveTo(E[0],E[1]);M.lineTo(D[0],D[1]);M.stroke();M.lineCap=this.config.cap;M.strokeStyle=this.config.color;M.lineWidth=this.config.width;M.beginPath();M.moveTo(E[0],E[1]);M.lineTo(D[0],D[1]);M.stroke();var P=E;var O=D;var N=[0,0];var L=20;var R=1-(L/J);N[0]=Math.abs(P[0]+R*(O[0]-P[0]));N[1]=Math.abs(P[1]+R*(O[1]-P[1]));var I=P[0]-O[0];var S=P[1]-O[1];var Q=P[0]*O[1]-P[1]*O[0];if(I!=0){a=S/I;b=Q/I}else{a=0}if(a==0){aProst=0}else{aProst=-1/a}bProst=N[1]-aProst*N[0];var Y=1+Math.pow(aProst,2);var X=2*aProst*bProst-2*N[0]-2*N[1]*aProst;var U=-2*N[1]*bProst+Math.pow(N[0],2)+Math.pow(N[1],2)-Math.pow(h,2)+Math.pow(bProst,2);var i=Math.pow(X,2)-4*Y*U;if(i<0){return }var g=(-X+Math.sqrt(i))/(2*Y);var f=(-X-Math.sqrt(i))/(2*Y);var H=aProst*g+bProst;var F=aProst*f+bProst;if(P[1]==O[1]){var Z=(P[0]>O[0])?1:-1;g=O[0]+Z*L;f=g;H-=h;F+=h}M.fillStyle=this.config.color;M.beginPath();M.moveTo(O[0],O[1]);M.lineTo(g,H);M.lineTo(f,F);M.fill();M.strokeStyle=this.config.bordercolor;M.lineWidth=this.config.borderwidth;M.beginPath();M.moveTo(O[0],O[1]);M.lineTo(g,H);M.lineTo(f,F);M.lineTo(O[0],O[1]);M.stroke()},drawStraight:function(){var G=7;var B=G+3;var D=[4+B,4+B];var K=this.terminal1.getXY();var I=this.terminal2.getXY();var A=Math.sqrt(Math.pow(K[0]-I[0],2)+Math.pow(K[1]-I[1],2));var E=[Math.min(K[0],I[0])-D[0],Math.min(K[1],I[1])-D[1]];var H=[Math.max(K[0],I[0])+D[0],Math.max(K[1],I[1])+D[1]];var C=Math.abs(H[0]-E[0])+B;var J=Math.abs(H[1]-E[1])+B;K[0]=K[0]-E[0];K[1]=K[1]-E[1];I[0]=I[0]-E[0];I[1]=I[1]-E[1];this.SetCanvasRegion(E[0],E[1],C,J);var F=this.getContext();F.lineCap=this.config.bordercap;F.strokeStyle=this.config.bordercolor;F.lineWidth=this.config.width+this.config.borderwidth*2;F.beginPath();F.moveTo(K[0],K[1]);F.lineTo(I[0],I[1]);F.stroke();F.lineCap=this.config.cap;F.strokeStyle=this.config.color;F.lineWidth=this.config.width;F.beginPath();F.moveTo(K[0],K[1]);F.lineTo(I[0],I[1]);F.stroke()},redraw:function(){if(this.config.drawingMethod=="straight"){this.drawStraight()}else{if(this.config.drawingMethod=="arrows"){this.drawArrows()}else{if(this.config.drawingMethod=="bezier"){this.drawBezierCurve()}else{throw new Error("WireIt.Wire unable to find '"+this.drawingMethod+"' drawing method.")}}}}});(function(){var A=YAHOO.util.Event,D=YAHOO.lang,B=YAHOO.util.Dom,C="WireIt-";WireIt.Scissors=function(E,F){WireIt.Scissors.superclass.constructor.call(this,document.createElement("div"),F);this._terminal=E;this.initScissors()};D.extend(WireIt.Scissors,YAHOO.util.Element,{initScissors:function(){this.hideNow();this.addClass(C+"Wire-scissors");this.appendTo(this._terminal.el);this.setStyle("left",(this._terminal.config.direction[0]*30+8)+"px");this.setStyle("top",(this._terminal.config.direction[1]*30+8)+"px");this.on("mouseover",this.show,this,true);this.on("mouseout",this.hide,this,true);this.on("click",this.scissorClick,this,true);A.addListener(this._terminal.el,"mouseover",this.mouseOver,this,true);A.addListener(this._terminal.el,"mouseout",this.hide,this,true)},mouseOver:function(){if(this._terminal.wires.length>0){this.show()}},scissorClick:function(){this._terminal.removeAllWires();if(this.terminalTimeout){this.terminalTimeout.cancel()}this.hideNow()},show:function(){this.setStyle("display","");if(this.terminalTimeout){this.terminalTimeout.cancel()}},hide:function(){this.terminalTimeout=D.later(700,this,this.hideNow)},hideNow:function(){this.setStyle("display","none")}});WireIt.TerminalProxy=function(F,E){this.terminal=F;this.termConfig=E||{};this.fakeTerminal=null;WireIt.TerminalProxy.superclass.constructor.call(this,this.terminal.el)};YAHOO.util.DDM.mode=YAHOO.util.DDM.INTERSECT;YAHOO.extend(WireIt.TerminalProxy,YAHOO.util.DDProxy,{startDrag:function(){if(this.terminal.config.nMaxWires==1&&this.terminal.wires.length==1){this.terminal.wires[0].remove()}else{if(this.terminal.wires.length>=this.terminal.config.nMaxWires){return }}this.fakeTerminal={config:{direction:this.terminal.config.fakeDirection},pos:[200,200],addWire:function(){},removeWire:function(){},getXY:function(){return this.pos}};var E=this.terminal.parentEl.parentNode;if(this.terminal.container){E=this.terminal.container.layer.el}this.editingWire=new WireIt.Wire(this.terminal,this.fakeTerminal,E,this.terminal.config.editingWireConfig);B.addClass(this.editingWire.element,C+"Wire-editing")},onDrag:function(F){if(this.terminal.container){var E=this.terminal.container.layer.el;var G=curtop=0;if(E.offsetParent){do{G+=E.offsetLeft;curtop+=E.offsetTop;E=E.offsetParent}while(E=E.offsetParent)}this.fakeTerminal.pos=[F.clientX-G+this.terminal.container.layer.el.scrollLeft,F.clientY-curtop+this.terminal.container.layer.el.scrollTop]}else{this.fakeTerminal.pos=[F.clientX+window.pageXOffset,F.clientY+window.pageYOffset]}this.editingWire.redraw()},endDrag:function(E){if(this.editingWire){this.editingWire.remove();this.editingWire=null}},onDragEnter:function(G,E){for(var F=0;F<E.length;F++){if(this.isValidWireTerminal(E[F])){E[F].terminal.setDropInvitation(true)}}},onDragOut:function(G,E){for(var F=0;F<E.length;F++){if(this.isValidWireTerminal(E[F])){E[F].terminal.setDropInvitation(false)}}},onDragDrop:function(K,F){this.onDragOut(K,F);var I=null;for(var G=0;G<F.length;G++){if(F[G].isWireItTerminal){I=F[G]}}if(I){if(this.isValidWireTerminal(I)){this.editingWire.remove();this.editingWire=null;var J=false;for(var G=0;G<this.terminal.wires.length;G++){if(this.terminal.wires[G].terminal1==this.terminal){if(this.terminal.wires[G].terminal2==I.terminal){J=true;break}}else{if(this.terminal.wires[G].terminal2==this.terminal){if(this.terminal.wires[G].terminal1==I.terminal){J=true;break}}}}if(!J){var H=this.terminal.parentEl.parentNode;if(this.terminal.container){H=this.terminal.container.layer.el}if(I.terminal.config.nMaxWires==1){if(I.terminal.wires.length>0){I.terminal.wires[0].remove()}var E=new WireIt.Wire(this.terminal,I.terminal,H,this.terminal.config.wireConfig);E.redraw()}else{if(I.terminal.wires.length<I.terminal.config.nMaxWires){var E=new WireIt.Wire(this.terminal,I.terminal,H,this.terminal.config.wireConfig);E.redraw()}else{}}}else{}}}},isWireItTerminal:true,isValidWireTerminal:function(E){if(!E.isWireItTerminal){return false}if(this.termConfig.type){if(this.termConfig.allowedTypes){if(WireIt.indexOf(E.termConfig.type,this.termConfig.allowedTypes)==-1){return false}}else{if(this.termConfig.type!=E.termConfig.type){return false}}}else{if(E.termConfig.type){if(E.termConfig.allowedTypes){if(WireIt.indexOf(this.termConfig.type,E.termConfig.allowedTypes)==-1){return false}}else{if(this.termConfig.type!=E.termConfig.type){return false}}}}return true}});WireIt.Terminal=function(G,F,E){this.parentEl=G;this.container=E;this.wires=[];this.config=F||{};this.config.direction=this.config.direction||[0,1];this.config.fakeDirection=this.config.fakeDirection||[-this.config.direction[0],-this.config.direction[1]];this.config.className=this.config.className||C+"Terminal";this.config.connectedClassName=this.config.connectedClassName||C+"Terminal-connected";this.config.dropinviteClassName=this.config.dropinviteClassName||C+"Terminal-dropinvite";this.config.editable=YAHOO.lang.isUndefined(this.config.editable)?true:this.config.editable;this.config.nMaxWires=this.config.nMaxWires||Infinity;this.config.wireConfig=this.config.wireConfig||{};this.config.editingWireConfig=this.config.editingWireConfig||this.config.wireConfig;this.eventAddWire=new YAHOO.util.CustomEvent("eventAddWire");this.eventRemoveWire=new YAHOO.util.CustomEvent("eventRemoveWire");this.el=null;this.render();if(this.config.editable){this.dd=new WireIt.TerminalProxy(this,this.config.ddConfig);this.scissors=new WireIt.Scissors(this)}};WireIt.Terminal.prototype={setDropInvitation:function(E){if(E){B.addClass(this.el,this.config.dropinviteClassName)}else{B.removeClass(this.el,this.config.dropinviteClassName)}},render:function(){this.el=WireIt.cn("div",{className:this.config.className});if(this.config.name){this.el.title=this.config.name}if(this.config.offsetPosition){this.el.style.left=this.config.offsetPosition[0]+"px";this.el.style.top=this.config.offsetPosition[1]+"px"}this.parentEl.appendChild(this.el)},addWire:function(E){this.wires.push(E);B.addClass(this.el,this.config.connectedClassName);this.eventAddWire.fire(E)},removeWire:function(F){var E=WireIt.indexOf(F,this.wires);if(E!=-1){this.wires[E]=null;this.wires=WireIt.compact(this.wires);if(this.wires.length==0){B.removeClass(this.el,this.config.connectedClassName)}this.eventRemoveWire.fire(F)}},getXY:function(){var E=this.container&&this.container.layer?this.container.layer.el:document.body;var F=this.el;var G=curtop=0;if(F.offsetParent){do{G+=F.offsetLeft;curtop+=F.offsetTop;F=F.offsetParent}while(!!F&&F!=E)}return[G+15,curtop+15]},remove:function(){while(this.wires.length>0){this.wires[0].remove()}this.parentEl.removeChild(this.el);A.purgeElement(this.el);if(this.scissors){A.purgeElement(this.scissors.get("element"))}},getConnectedTerminals:function(){var E=[];if(this.wires){for(var F=0;F<this.wires.length;F++){E.push(this.wires[F].getOtherTerminal())}}return E},redrawAllWires:function(){if(this.wires){for(var E=0;E<this.wires.length;E++){this.wires[E].redraw()}}},removeAllWires:function(){while(this.wires.length>0){this.wires[0].remove()}}};WireIt.util.TerminalInput=function(G,F,E){if(!F){var F={}}F.direction=[0,-1];F.fakeDirection=[0,1];F.ddConfig={type:"input",allowedTypes:["output"]};F.nMaxWires=1;WireIt.util.TerminalInput.superclass.constructor.call(this,G,F,E)};YAHOO.extend(WireIt.util.TerminalInput,WireIt.Terminal);WireIt.util.TerminalOutput=function(G,F,E){if(!F){var F={}}F.direction=[0,1];F.fakeDirection=[0,-1];F.ddConfig={type:"output",allowedTypes:["input"]};WireIt.util.TerminalOutput.superclass.constructor.call(this,G,F,E)};YAHOO.extend(WireIt.util.TerminalOutput,WireIt.Terminal)})();WireIt.util.DD=function(D,C,A,B){if(!D){throw new Error("WireIt.util.DD needs at least terminals and id")}this._WireItTerminals=D;WireIt.util.DD.superclass.constructor.call(this,C,A,B)};YAHOO.extend(WireIt.util.DD,YAHOO.util.DD,{onDrag:function(D){var A=YAHOO.lang.isArray(this._WireItTerminals)?this._WireItTerminals:(this._WireItTerminals.isWireItTerminal?[this._WireItTerminals]:[]);for(var C=0;C<A.length;C++){if(A[C].wires){for(var B=0;B<A[C].wires.length;B++){A[C].wires[B].redraw()}}}},setTerminals:function(A){this._WireItTerminals=A}});WireIt.util.DDResize=function(A,B){this.myConf=B||{};this.myConf.container=A;this.myConf.minWidth=this.myConf.minWidth||50;this.myConf.minHeight=this.myConf.minHeight||50;WireIt.util.DDResize.superclass.constructor.apply(this,[A.el,A.ddResizeHandle]);this.setHandleElId(A.ddResizeHandle);this.eventResize=new YAHOO.util.CustomEvent("eventResize")};YAHOO.extend(WireIt.util.DDResize,YAHOO.util.DragDrop,{onMouseDown:function(B){var A=this.getEl();this.startWidth=A.offsetWidth;this.startHeight=A.offsetHeight;this.startPos=[YAHOO.util.Event.getPageX(B),YAHOO.util.Event.getPageY(B)]},onDrag:function(F){var D=[YAHOO.util.Event.getPageX(F),YAHOO.util.Event.getPageY(F)];var A=D[0]-this.startPos[0];var G=D[1]-this.startPos[1];var E=Math.max(this.startWidth+A,this.myConf.minWidth);var C=Math.max(this.startHeight+G,this.myConf.minHeight);var B=this.getEl();B.style.width=E+"px";B.style.height=C+"px";this.eventResize.fire([E,C])}});(function(){var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,CSS_PREFIX="WireIt-";WireIt.Container=function(config,layer){this.config=config||{};this.config.terminals=this.config.terminals||[];this.config.draggable=(typeof this.config.draggable=="undefined")?true:this.config.draggable;this.config.position=this.config.position||[100,100];this.config.className=this.config.className||CSS_PREFIX+"Container";this.config.ddHandle=(typeof this.config.ddHandle=="undefined")?true:this.config.ddHandle;this.config.ddHandleClassName=this.config.ddHandleClassName||CSS_PREFIX+"Container-ddhandle";this.config.resizable=(typeof this.config.resizable=="undefined")?true:this.config.resizable;this.config.resizeHandleClassName=this.config.resizeHandleClassName||CSS_PREFIX+"Container-resizehandle";this.config.width=this.config.width;this.config.height=this.config.height;this.config.close=(typeof this.config.close=="undefined")?true:this.config.close;this.config.closeButtonClassName=this.config.closeButtonClassName||CSS_PREFIX+"Container-closebutton";this.layer=layer;this.terminals=[];this.wires=[];this.el=null;this.bodyEl=null;this.eventAddWire=new YAHOO.util.CustomEvent("eventAddWire");this.eventRemoveWire=new YAHOO.util.CustomEvent("eventRemoveWire");this.render();this.initTerminals(this.config.terminals);if(this.config.draggable){if(this.config.resizable){this.ddResize=new WireIt.util.DDResize(this);this.ddResize.eventResize.subscribe(this.onResize,this,true)}this.dd=new WireIt.util.DD(this.terminals,this.el);if(this.config.ddHandle){this.dd.setHandleElId(this.ddHandle)}if(this.config.resizable){this.dd.addInvalidHandleId(this.ddResizeHandle);this.ddResize.addInvalidHandleId(this.ddHandle)}}};WireIt.Container.prototype={onResize:function(event,args){var size=args[0];WireIt.sn(this.bodyEl,null,{width:(size[0]-10)+"px",height:(size[1]-44)+"px"})},render:function(){this.el=WireIt.cn("div",{className:this.config.className});if(this.config.width){this.el.style.width=this.config.width+"px"}if(this.config.height){this.el.style.height=this.config.height+"px"}Event.addListener(this.el,"mousedown",this.onMouseDown,this,true);if(this.config.ddHandle){this.ddHandle=WireIt.cn("div",{className:this.config.ddHandleClassName});this.el.appendChild(this.ddHandle)}this.bodyEl=WireIt.cn("div",{className:"body"});this.el.appendChild(this.bodyEl);if(this.config.resizable){this.ddResizeHandle=WireIt.cn("div",{className:this.config.resizeHandleClassName});this.el.appendChild(this.ddResizeHandle)}if(this.config.close){this.closeButton=WireIt.cn("div",{className:this.config.closeButtonClassName});this.el.appendChild(this.closeButton);Event.addListener(this.closeButton,"click",this.onCloseButton,this,true)}this.layer.el.appendChild(this.el);this.el.style.left=this.config.position[0]+"px";this.el.style.top=this.config.position[1]+"px"},setBody:function(content){if(typeof content=="string"){this.bodyEl.innerHTML=content}else{this.bodyEl.innerHTML="";this.bodyEl.appendChild(content)}},onMouseDown:function(){if(this.layer){if(this.layer.focusedContainer&&this.layer.focusedContainer!=this){this.layer.focusedContainer.removeFocus()}this.setFocus();this.layer.focusedContainer=this}},setFocus:function(){Dom.addClass(this.el,CSS_PREFIX+"Container-focused")},removeFocus:function(){Dom.removeClass(this.el,CSS_PREFIX+"Container-focused")},onCloseButton:function(e,args){Event.stopEvent(e);this.layer.removeContainer(this)},remove:function(){this.removeAllTerminals();this.layer.el.removeChild(this.el);Event.purgeElement(this.el)},initTerminals:function(terminalConfigs){for(var i=0;i<terminalConfigs.length;i++){this.addTerminal(terminalConfigs[i])}},addTerminal:function(terminalConfig){var type=eval(terminalConfig.xtype||"WireIt.Terminal");var term=new type(this.el,terminalConfig,this);this.terminals.push(term);term.eventAddWire.subscribe(this.onAddWire,this,true);term.eventRemoveWire.subscribe(this.onRemoveWire,this,true);return term},onAddWire:function(event,args){var wire=args[0];if(WireIt.indexOf(wire,this.wires)==-1){this.wires.push(wire);this.eventAddWire.fire(wire)}},onRemoveWire:function(event,args){var wire=args[0];var index=WireIt.indexOf(wire,this.wires);if(index!=-1){this.eventRemoveWire.fire(wire);this.wires[index]=null}this.wires=WireIt.compact(this.wires)},removeAllTerminals:function(){for(var i=0;i<this.terminals.length;i++){this.terminals[i].remove()}this.terminals=[]},redrawAllWires:function(){for(var i=0;i<this.terminals.length;i++){this.terminals[i].redrawAllWires()}},getConfig:function(){var obj={};obj.position=Dom.getXY(this.el);if(this.layer){var layerPos=Dom.getXY(this.layer.el);obj.position[0]-=layerPos[0];obj.position[1]-=layerPos[1]}if(this.config.xtype){obj.xtype=this.config.xtype}return obj}}})();WireIt.Layer=function(A){this.config=A||{};this.config.className=this.config.className||"WireIt-Layer";this.config.parentEl=this.config.parentEl||document.body;this.config.containers=this.config.containers||[];this.config.wires=this.config.wires||[];this.config.layerMap=YAHOO.lang.isUndefined(this.config.layerMap)?false:this.config.layerMap;this.containers=[];this.wires=[];this.el=null;this.eventAddWire=new YAHOO.util.CustomEvent("eventAddWire");this.eventRemoveWire=new YAHOO.util.CustomEvent("eventRemoveWire");this.eventAddContainer=new YAHOO.util.CustomEvent("eventAddContainer");this.eventRemoveContainer=new YAHOO.util.CustomEvent("eventRemoveContainer");this.eventContainerDragged=new YAHOO.util.CustomEvent("eventContainerDragged");this.eventContainerResized=new YAHOO.util.CustomEvent("eventContainerResized");this.render();this.initContainers();this.initWires();if(this.config.layerMap){new WireIt.LayerMap({layer:this})}};WireIt.Layer.prototype={render:function(){this.el=WireIt.cn("div",{className:this.config.className});this.config.parentEl.appendChild(this.el)},initContainers:function(){for(var A=0;A<this.config.containers.length;A++){this.addContainer(this.config.containers[A])}},initWires:function(){for(var A=0;A<this.config.wires.length;A++){this.addWire(this.config.wires[A])}},addWire:function(wireConfig){var type=eval(wireConfig.xtype||"WireIt.Wire");var src=wireConfig.src;var tgt=wireConfig.tgt;var terminal1=this.containers[src.moduleId].terminals[src.terminalId];var terminal2=this.containers[tgt.moduleId].terminals[tgt.terminalId];var wire=new type(terminal1,terminal2,this.el);wire.redraw();return wire},addContainer:function(containerConfig){var type=eval(containerConfig.xtype||"WireIt.Container");var container=new type(containerConfig,this);this.containers.push(container);container.eventAddWire.subscribe(this.onAddWire,this,true);container.eventRemoveWire.subscribe(this.onRemoveWire,this,true);if(container.ddResize){container.ddResize.on("endDragEvent",function(){this.eventContainerResized.fire(container)},this,true)}if(container.dd){container.dd.on("endDragEvent",function(){this.eventContainerDragged.fire(container)},this,true)}this.eventAddContainer.fire(container);return container},removeContainer:function(A){var B=WireIt.indexOf(A,this.containers);if(B!=-1){A.remove();this.containers[B]=null;this.containers=WireIt.compact(this.containers);this.eventRemoveContainer.fire(A)}},onAddWire:function(B,A){var C=A[0];if(WireIt.indexOf(C,this.wires)==-1){this.wires.push(C);this.eventAddWire.fire(C)}},onRemoveWire:function(C,B){var D=B[0];var A=WireIt.indexOf(D,this.wires);if(A!=-1){this.wires[A]=null;this.wires=WireIt.compact(this.wires);this.eventRemoveWire.fire(D)}},removeAllContainers:function(){while(this.containers.length>0){this.removeContainer(this.containers[0])}},getWiring:function(){var B;var C={containers:[],wires:[]};for(B=0;B<this.containers.length;B++){C.containers.push(this.containers[B].getConfig())}for(B=0;B<this.wires.length;B++){var D=this.wires[B];var A={src:{moduleId:WireIt.indexOf(D.terminal1.container,this.containers),terminalId:WireIt.indexOf(D.terminal1,D.terminal1.container.terminals)},tgt:{moduleId:WireIt.indexOf(D.terminal2.container,this.containers),terminalId:WireIt.indexOf(D.terminal2,D.terminal2.container.terminals)}};C.wires.push(A)}return C},setWiring:function(B){this.removeAllContainers();for(var A=0;A<B.containers.length;A++){this.addContainer(B.containers[A])}for(var A=0;A<B.wires.length;A++){this.addWire(B.wires[A])}},clear:function(){this.removeAllContainers()}};WireIt.util.Anim=function(E,B,A,C,D){if(!E){throw new Error("WireIt.util.Anim needs at least terminals and id")}if(!YAHOO.util.Anim){return }this._WireItTerminals=E;WireIt.util.Anim.superclass.constructor.call(this,B,A,C,D);this.onTween.subscribe(this.moveWireItWires,this,true)};if(YAHOO.util.Anim){YAHOO.extend(WireIt.util.Anim,YAHOO.util.Anim,{moveWireItWires:function(D){var A=YAHOO.lang.isArray(this._WireItTerminals)?this._WireItTerminals:(this._WireItTerminals.isWireItTerminal?[this._WireItTerminals]:[]);for(var C=0;C<A.length;C++){if(A[C].wires){for(var B=0;B<A[C].wires.length;B++){A[C].wires[B].redraw()}}}},setTerminals:function(A){this._WireItTerminals=A}})};