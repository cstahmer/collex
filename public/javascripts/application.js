/** 
 *  Copyright 2007 Applied Research in Patacriticism and the University of Virginia
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 **/

// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

// perform initialization after DOM loads
Event.observe(window, 'load', function() {	
	// initialize hacks whenever the page loads
	initializeHacks();
});	

function toggleIt(element) {
  var tr = element.parentNode.parentNode;
  //alert("parent node: " + tr);
  var className = tr.className;
  //if (tr.previousSibling.className == className) 
  if (node_before(tr).className == className) { 
    //tr = tr.previousSibling; 
    tr = node_before(tr);
  }

  while (true) {
    Element.toggle(tr);
    //tr = tr.nextSibling;
    tr = node_after(tr);
    //window.alert("sibling: " + tr);
    if (tr == null || tr.className != className) break;
  }
}

// deselect all checkboxes within the specified div 
function deselectAll(target) {
	var checkboxes = $(target).select( 'input[type=checkbox]' );
	for (var i=0; i < checkboxes.length; i++) {  
		var checkbox = checkboxes[i];
		checkbox.checked = false;
	}		
}

// select all checkboxes within the specified div 
function selectAll(target) {
	var checkboxes = $(target).select( 'input[type=checkbox]' );
	for (var i=0; i < checkboxes.length; i++) {  
		var checkbox = checkboxes[i];
		checkbox.checked = true;
	}		
}

function toggleCategory(category_id) {
	elems = document.getElementsByClassName("cat_" + category_id + "_child");

	Element.toggle("cat_" + category_id + "_opened");
	Element.toggle("cat_" + category_id + "_closed");

	for (var i=0; i < elems.length; i++) {  
		if ( elems[i].hasClassName("noshow") ) {
			Element.removeClassName(elems[i], "noshow");
		} else {
			Element.addClassName(elems[i], "noshow");
		}
	}	
}

function toggle_by_id(node_id) {
	Element.toggle(node_id + "_opened");
	Element.toggle(node_id + "_closed");
	Element.toggle(node_id);
}

function popUp(URL) {
  day = new Date();
  id = day.getTime();
  eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=300,height=400');");
}

function validateCollector()
{
  if (document.forms['collectform'].collector_tag.value == '')
  {
    Effect.Appear('collect-status', { duration: 1.0 });
    return false;
  }
  else
  {
    Effect.Fade('collect-status', { duration: 0.0 });
    Effect.Appear('collected', { duration: 0.25 });
    document.forms['collectform'].onsubmit();
  }
}

/** Note: methods below are needed to overcome a bug in Firefox.  An explanation
 *        is at:
 *         
 *        http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM
 */
     
/**
 * Version of |previousSibling| that skips nodes that are entirely
 * whitespace or comments.  (Normally |previousSibling| is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest previous sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_before( sib )
{
  while ((sib = sib.previousSibling)){
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |nextSibling| that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest next sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_after( sib ) {
  while ((sib = sib.nextSibling)){
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the DOM1 |Node| interface.
 * @return     true if the node is:
 *                1) A |Text| node that is all whitespace
 *                2) A |Comment| node
 *             and otherwise false.
 */

function is_ignorable( nod ){
  return ( nod.nodeType == 8) || // A comment node
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the |CharacterData| interface (i.e.,
 *             a |Text|, |Comment|, or |CDATASection| node
 * @return     True if all of the text content of |nod| is whitespace,
 *             otherwise false.
 */
function is_all_ws( nod ){
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.data));
}


// borrowed from http://developer.apple.com/internet/webcontent/examples/popup.html

// Copyright © 2000 by Apple Computer, Inc., All Rights Reserved.
//
// You may incorporate this Apple sample code into your own code
// without restriction. This Apple sample code has been provided "AS IS"
// and the responsibility for its operation is yours. You may redistribute
// this code, but you are not permitted to redistribute it as
// "Apple sample code" after having made changes.
//
// ************************
// layer utility routines *
// ************************

function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its id
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
} // getStyleObject

function changeObjectVisibility(objectId, newVisibility) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.visibility = newVisibility;
	return true;
    } else {
	// we couldn't find the object, so we can't change its visibility
	return false;
    }
} // changeObjectVisibility

function moveObject(objectId, newXCoordinate, newYCoordinate) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.left = "" + (newXCoordinate-500) + "px";
	styleObject.top = "" + (newYCoordinate-50) + "px";
//window.alert("left: " + styleObject.left + "  coord left: " + newXCoordinate + " id: " + objectId);
	return true;
    } else {
	// we couldn't find the object, so we can't very well move it
	return false;
    }
} // moveObject

function moveObject2(objectId, newXCoordinate, newYCoordinate) {
    // get a reference to the cross-browser style object and make sure the object exists
    var styleObject = getStyleObject(objectId);
    if(styleObject) {
	styleObject.left = "" + (newXCoordinate) + "px";
	styleObject.top = "" + (newYCoordinate) + "px";
//window.alert("left: " + styleObject.left + "  coord left: " + newXCoordinate + " id: " + objectId);
	return true;
    } else {
	// we couldn't find the object, so we can't very well move it
	return false;
    }
} // moveObject




// Copyright © 2000 by Apple Computer, Inc., All Rights Reserved.
//
// You may incorporate this Apple sample code into your own code
// without restriction. This Apple sample code has been provided "AS IS"
// and the responsibility for its operation is yours. You may redistribute
// this code, but you are not permitted to redistribute it as
// "Apple sample code" after having made changes.
// ********************************
// application-specific functions *
// ********************************

// store variables to control where the popup will appear relative to the cursor position
// positive numbers are below and to the right of the cursor, negative numbers are above and to the left

var agt=navigator.userAgent.toLowerCase()
var is_ie  = agt.indexOf("msie") != -1

// internet explorer sucks and needs to be tricked into getting the right offset
if (is_ie)
{
  var xOffset = 240;
}
else
{
  var xOffset = 30;
}
var yOffset = -5;

function showPopup (targetObjectId, eventObj) {
    if(eventObj) {
	// hide any currently-visible popups
	hideCurrentPopup();
	// stop event from bubbling up any farther
	eventObj.cancelBubble = true;
	// move popup div to current cursor position 
	// (add scrollTop to account for scrolling for IE)
	var newXCoordinate = (eventObj.pageX)?eventObj.pageX + xOffset:eventObj.x + xOffset + ((document.body.scrollLeft)?document.body.scrollLeft:0);
	var newYCoordinate = (eventObj.pageY)?eventObj.pageY + yOffset:eventObj.y + yOffset + ((document.body.scrollTop)?document.body.scrollTop:0);
	moveObject(targetObjectId, newXCoordinate, newYCoordinate);
	// and make it visible
	if( changeObjectVisibility(targetObjectId, 'visible') ) {
	    // if we successfully showed the popup
	    // store its Id on a globally-accessible object
	    window.currentlyVisiblePopup = targetObjectId;
	    return true;
	} else {
	    // we couldn't show the popup, boo hoo!
	    return false;
	}
    } else {
	// there was no event object, so we won't be able to position anything, so give up
	return false;
    }
} // showPopup

function hideCurrentPopup() {
    // note: we've stored the currently-visible popup on the global object window.currentlyVisiblePopup
    if(window.currentlyVisiblePopup) {
	changeObjectVisibility(window.currentlyVisiblePopup, 'hidden');
	window.currentlyVisiblePopup = false;
    }
} // hideCurrentPopup



// ***********************
// hacks and workarounds *
// ***********************

// setup an event handler to hide popups for generic clicks on the document
document.onclick = hideCurrentPopup;

function initializeHacks() {
    // this ugly little hack resizes a blank div to make sure you can click
    // anywhere in the window for Mac MSIE 5
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) 
	&& (navigator.platform.indexOf('Mac') != -1)
	&& getStyleObject('blankDiv')) {
	window.onresize = explorerMacResizeFix;
    }
    resizeBlankDiv();
    // this next function creates a placeholder object for older browsers
    createFakeEventObj();
}

function createFakeEventObj() {
    // create a fake event object for older browsers to avoid errors in function call
    // when we need to pass the event object to functions
    if (!window.event) {
	window.event = false;
    }
} // createFakeEventObj

function resizeBlankDiv() {
    // resize blank placeholder div so IE 5 on mac will get all clicks in window
    if ((navigator.appVersion.indexOf('MSIE 5') != -1) 
	&& (navigator.platform.indexOf('Mac') != -1)
	&& getStyleObject('blankDiv')) {
	getStyleObject('blankDiv').width = document.body.clientWidth - 20;
	getStyleObject('blankDiv').height = document.body.clientHeight - 20;
    }
}

function explorerMacResizeFix () {
    location.reload(false);
}

// -----
function showCollector(uri, event, header) {
  f = $('collectform');
  if (f) {
    f.reset();
    f.objid.value = uri;        
    if (!header) header = '';
    $('collector_header').innerHTML = header;
  }
  //alert(uri);
  //showPopup('collectformarea', event);

  var newXCoordinate = (event.pageX)?event.pageX + xOffset:event.x + xOffset + ((document.body.scrollLeft)?document.body.scrollLeft:0);
  var newYCoordinate = (event.pageY)?event.pageY + yOffset:event.y + yOffset + ((document.body.scrollTop)?document.body.scrollTop:0);
  moveObject2('collectformarea', newXCoordinate, newYCoordinate);
}

function showAlert(divID, event)
{
  new Effect.Appear(divID, { duration: 0.5 }); 
  var newXCoordinate = (event.pageX)?event.pageX + xOffset:event.x + xOffset + ((document.body.scrollLeft)?document.body.scrollLeft:0);
  var newYCoordinate = (event.pageY)?event.pageY + yOffset:event.y + yOffset + ((document.body.scrollTop)?document.body.scrollTop:0);
  moveObject2(divID, newXCoordinate, newYCoordinate);
}

function displayCollector(id, uri, event, header)
{
  // reset the display properties for the status
  Effect.Fade('collect-status', { duration: 0.0 });
  Effect.Fade('collected', { duration: 0.0 });

  new Effect.Appear('collectformarea', { duration: 0.5 }); 
  showCollector(uri, event, header); 

  // give focus to the tag field
  if (document.forms['collectform'] && document.forms['collectform'].collector_tag)
  {
    setTimeout("document.forms['collectform'].collector_tag.focus()",100);
  }
}

function bulkCollect(event)
{
	var checkboxes = Form.getInputs('bulk_collect_form', 'checkbox');
	
	var has_one = false;
	for (i = 0; i < checkboxes.length; i++) {
		var checkbox = checkboxes[i];
		if (checkbox.checked) {
			has_one = true;
		}
	}
	
	if (has_one)
	{
		var form = document.getElementById('bulk_collect_form');
		form.submit();
	}
	else
	{
		alert("You must select one or more objects before clicking this button.")
	}
}

bulk_checked = false;

function toggleAllBulkCollectCheckboxes(link) {
  bulk_checked = !bulk_checked;
  checkboxes = Form.getInputs('bulk_collect_form', 'checkbox');
  for (i=0; i < checkboxes.length; i++) {
    checkbox = checkboxes[i];
    checkbox.checked = bulk_checked;
  }

  elements = document.getElementsByClassName('bulk_select_all');
  for (i=0; i<elements.length; i++) {
    elements[i].toggle();
  }

  elements = document.getElementsByClassName('bulk_unselect_all');
  for (i=0; i<elements.length; i++) {
    elements[i].toggle();
  }
}

//
// functions that handle the AJAX inside a result div
//

function getX( oElement )
{
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getY( oElement )
{
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}


function currentScrollPos() {
	var pos = [
		f_filterResults (
			window.pageXOffset ? window.pageXOffset : 0,
			document.documentElement ? document.documentElement.scrollLeft : 0,
			document.body ? document.body.scrollLeft : 0
		),
		f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		)];
		return pos;
}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function moveObjectToJustBelowItsParent(target_id, parent_id)
{
	// Get the absolute location of the parent
	var par = document.getElementById(parent_id);
	var x = getX(par);
	var y = getY(par);
	
	// Get the right side of the parent and the target: we want to right justify
	var targ = document.getElementById(target_id);
	var targ_width = parseInt(targ.style.width);	// This includes the trailing 'px'
	var par_width = par.offsetWidth;
	var newXCoordinate = x + ((document.body.scrollLeft)?document.body.scrollLeft:0) - targ_width + par_width;
	var newYCoordinate = y + ((document.body.scrollTop)?document.body.scrollTop:0) + par.offsetHeight;
	moveObject2(target_id, newXCoordinate, newYCoordinate);
}

function moveObjectToLeftTopOfItsParent(target_id, parent_id)
{
	// Get the absolute location of the parent
	var par = document.getElementById(parent_id);
	var x = getX(par);
	var y = getY(par);
	
	var newXCoordinate = x + ((document.body.scrollLeft)?document.body.scrollLeft:0);
	var newYCoordinate = y + ((document.body.scrollTop)?document.body.scrollTop:0);
	
	// Adjust the width if the dialog would be off the side of the page
	var max_x = document.width;
	var t = $(target_id);
	var w = parseInt(t.getStyle('width'));
	var max_x = document.width - w - 10;	// Add a little margin so it is not right against the page.
	if (newXCoordinate > max_x)
		newXCoordinate = max_x;
	moveObject2(target_id, newXCoordinate, newYCoordinate);
}

function getFullText(row_id)
{
	var el_full_text = document.getElementById(row_id+ "_full_text");
	var full_text = "";
	if (el_full_text)
		full_text = encodeForUri(el_full_text.innerHTML);
	return full_text;	
}

function doCollect(uri, row_num, row_id)
{
	var ptr = $(row_id);
	ptr.removeClassName('result_without_tag');
	ptr.addClassName('result_with_tag');
	var full_text = getFullText(row_id);
	
	new Ajax.Updater(row_id, "/results/collect", {
		parameters : "uri="+ encodeForUri(uri) + "&row_num=" + row_num + "&full_text=" + full_text,
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function doRemoveTag(uri, row_num, row_id, tag_name)
{
	var full_text = getFullText(row_id);

	new Ajax.Updater(row_id, "/results/remove_tag", {
		parameters : "uri="+ encodeForUri(uri) + "&row_num=" + row_num + "&tag=" + encodeForUri(tag_name) + "&full_text=" + full_text,
		onComplete : tagFinishedUpdating,
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function doRemoveCollect(uri, row_num, row_id)
{
	var tr = document.getElementById(row_id);
	tr.className = 'result_without_tag'; 
	var full_text = getFullText(row_id);
	
	new Ajax.Updater(row_id, "/results/uncollect", {
		parameters : "uri="+ encodeForUri(uri) + "&row_num=" + row_num + "&full_text=" + full_text,
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function focusTag()
{
	document.getElementById('tag_tag').focus();
}

function doAddTag(parent_id, uri, row_num, row_id)
{
	new Effect.Appear('tag-div', { duration: 0.5 }); 
	moveObjectToJustBelowItsParent('tag-div', parent_id);
	
	document.getElementById('tag_uri').value = uri;
	document.getElementById('tag_row_num').value = row_num;
	document.getElementById('tag_row_id').value = row_id;
	setTimeout(focusTag, 100);	// We need to delay setting the focus because the tag isn't on the screen until the Effect.Appear has finished.
}

function focusAnnotation()
{
	document.getElementById('note_notes').focus();
}

function doAnnotation(parent_id, uri, row_num, row_id, curr_annotation_id)
{
	new Effect.Appear('note-div', { duration: 0.5 }); 
	moveObjectToJustBelowItsParent('note-div', parent_id);
	
	document.getElementById('note_uri').value = uri;
	document.getElementById('note_row_num').value = row_num;
	document.getElementById('note_row_id').value = row_id;
	var existing_note = document.getElementById(curr_annotation_id).innerHTML;
	existing_note = existing_note.gsub("<br />", "\n");
	existing_note = existing_note.gsub("<br>", "\n");
	document.getElementById('note_notes').value = existing_note;
	setTimeout(focusAnnotation, 100);	// We need to delay setting the focus because the annotation isn't on the screen until the Effect.Appear has finished.
}

function tagFinishedUpdating()
{
	var el_sidebar = document.getElementById('tag_sidebar');
	if (el_sidebar)
	{
		new Ajax.Updater('tag_sidebar', "/tag/update_sidebar", {
			onFailure : function(resp) { alert("Oops, there's been an error."); }
		});
	}
}

function doAddTagSubmit()
{
	var el_uri = document.getElementById('tag_uri');
	var el_row_num = document.getElementById('tag_row_num');
	var el_row_id = document.getElementById('tag_row_id');
	var el_tag = document.getElementById('tag_tag');
	var tag_value = encodeForUri(el_tag.value);
    Effect.Fade('tag-div', { duration: 0.0 });
	var full_text = getFullText(el_row_id.value);

	new Ajax.Updater(el_row_id.value, "/results/add_tag", {
		parameters : "uri="+ encodeForUri(el_uri.value) + "&row_num=" + el_row_num.value + "&tag=" + tag_value + "&full_text=" + full_text,
		onComplete : tagFinishedUpdating,
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function doAnnotationSubmit()
{
	var el_uri = document.getElementById('note_uri');
	var el_row_num = document.getElementById('note_row_num');
	var el_row_id = document.getElementById('note_row_id');
	var el_note = document.getElementById('note_notes');
	var note_value = encodeForUri(el_note.value);
    Effect.Fade('note-div', { duration: 0.0 });
	var full_text = getFullText(el_row_id.value);

	new Ajax.Updater(el_row_id.value, "/results/set_annotation", {
		parameters : "uri="+ encodeForUri(el_uri.value) + "&row_num=" + el_row_num.value + "&note=" + note_value + "&full_text=" + full_text,
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function doRemoveObjectFromExhibit(exhibit_id, uri)
{
	new Ajax.Updater("exhibited_objects_container", "/my9s/remove_exhibited_object", {
		parameters : { uri: uri, exhibit_id: exhibit_id },
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function doAddToExhibit(uri, index, row_id)
{
	// put up a Prototype window type dialog.
	InputDialog.prototype.prepareDomForEditing("link_" + row_id, row_id + ",exhibited_objects_container", "/results/add_object_to_exhibit,/my9s/resend_exhibited_objects");
	showAddToExhibitDlg(uri, index, row_id);
}

function showAddToExhibitDlg(uri, index, row_id)
{
	// First construct the dialog
	var dlg = new InputDialog("link_"+row_id);
	dlg.addHidden("uri");
	dlg.addHidden("index");
	dlg.addHidden("row_id");
	
	dlg.addSelect('Exhibit:', 'exhibit', exhibit_names);
	
	// Now populate a hash with all the starting values.	
	// directly below element_id are all the hidden fields with the data we want to use to populate the dialog with
	
	var values = {};
	
	// We also need to set the hidden fields on our form. This is the mechanism
	// for passing back the context to the controller.
	values['uri'] = uri;
	values['index'] = index;
	values['row_id'] = row_id;
	
	// Now, everything is initialized, fire up the dialog.
	var el = $("link_"+row_id);
	dlg.show("Choose exhibit", getX(el), getY(el), values );
}


function cancel_edit_profile_mode(partial_id)
{
	new Ajax.Updater(partial_id, "/my9s/update_profile", {
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

function enter_edit_profile_mode(partial_id)
{
	new Ajax.Updater(partial_id, "/my9s/enter_edit_profile_mode", {
		onFailure : function(resp) { alert("Oops, there's been an error."); }
	});
}

//function update_profile(partial_id)
//{
//	new Ajax.Updater(partial_id, "/my9s/update_profile", {
//		parameters : "fullname="+ encodeForUri($("fullname").value) + 
//			"&institution=" + encodeForUri($("institution").value) + 
//			"&link=" + encodeForUri($("link").value) + 
//			"&aboutme=" + encodeForUri($("aboutme").value),
//		onFailure : function(resp) { alert("Oops, there's been an error."); }
//	});
//}

function encodeForUri(str)
{
	var value = str.gsub('%', '%25');
	value = value.gsub('#', '%23');
	value = value.gsub('&', '%26');
	value = value.gsub(/\?/, '%3f');
	return value;
}
//function displayDetails(parent_id, page_num, row_num, row_id)
//{
//	new Effect.Appear('result-details-div', { duration: 0.5 }); 
//	moveObjectToLeftTopOfItsParent('result-details-div', parent_id);
//
//	new Ajax.Updater('result-details', "/results/details", {
//		parameters : "page_num="+ page_num + "&row_num=" + row_num,
//		onFailure : function(resp) { alert("Oops, there's been an error."); }
//	});
//}

function focusSaveSearch()
{
	document.getElementById('save_name').focus();
}

function doSaveSearch(parent_id)
{
	new Effect.Appear('save-search-div', { duration: 0.5 }); 
	moveObjectToJustBelowItsParent('save-search-div', parent_id);
	
	setTimeout(focusSaveSearch, 100);	// We need to delay setting the focus because the dlg isn't on the screen until the Effect.Appear has finished.
}

function doSaveSearchSubmit()
{
    Effect.Fade('save-search-div', { duration: 0.0 });

	var form = document.getElementById('save-search-form');
	form.submit();

}

function setTagVisibility(zoom_level)
{
	var spans = $$('#tagcloud span');
	for (i = 0; i < spans.length; i++)
	{
		var classname = spans[i].className;
		var level = parseInt(classname.substring(5));
		spans[i].style.display = (level >= zoom_level) ? 'inline' : 'none';
	}
}

function doZoom(level)
{
	switch (level)
	{
		case "+": if (zoom_level < 10) zoom_level++; break;
		case "-": if (zoom_level > 1) zoom_level--; break;
		case "1": zoom_level = 1; break;
		case "2": zoom_level = 2; break;
		case "3": zoom_level = 3; break;
		case "4": zoom_level = 4; break;
		case "5": zoom_level = 5; break;
		case "6": zoom_level = 6; break;
		case "7": zoom_level = 7; break;
		case "8": zoom_level = 8; break;
		case "9": zoom_level = 9; break;
		case "10": zoom_level = 10; break;
	}
	setTagVisibility(zoom_level);
	
	var thumb = $('tag_zoom_thumb');
	thumb.style.top = "" + (306 - zoom_level*8) + "px";
	
	if (_dragElement == null)
		new Ajax.Updater("", "/tag/set_zoom", { parameters : "level="+ zoom_level } );

}

var _startY = 0;  // mouse starting positions 
var _offsetY = 0;  // current element offset 
var _dragElement; // needs to be passed from OnMouseDown to OnMouseMove 
var _oldZIndex = 0; // we temporarily increase the z-index during drag
var _curr_pos = 0;

function IsDraggable(target)
{
	// If any parent of what is clicked is draggable, the element is draggable.
	while (target) {
		if (target.id == 'tag_zoom_thumb') 
			return target;
		target = target.parentNode;
	}
	return null;
}

function ZoomThumbMouseDown(e)
{
	 // IE doesn't pass the event object
	 if (e == null) e = window.event;
	 // IE uses srcElement, others use target
	 var target = e.target != null ? e.target : e.srcElement;
	 target = IsDraggable(target);
	  
	  // for IE, left click == 1
	  // for Firefox, left click == 0
	  
	  if ((e.button == 1 && window.event != null || e.button == 0) && target != null) {
	  	// grab the mouse position
	  	_startY = e.clientY;
	  	// grab the clicked element's position
	  	_offsetY = ExtractNumber(target.style.top);
	  	// bring the clicked element to the front while it is being dragged
	  	_oldZIndex = target.style.zIndex;
	  	target.style.zIndex = 10000;
	  	// we need to access the element in OnMouseMove
	  	_dragElement = target;
	  	// tell our code to start moving the element with the mouse
	  	document.onmousemove = ZoomThumbMouseMove;
	  	// cancel out any text selections
	  	document.body.focus();
	  	// prevent text selection in IE
	  	document.onselectstart = function()
	  	{
	  		return false;
	  	};
	  	// prevent IE from trying to drag an image
	  	target.ondragstart = function()
	  	{
	  		return false;
	  	};
	  	// prevent text selection (except IE)
	  	return false;
	  }
}

function ZoomThumbMouseMove(e)
{
	if (e == null) 
		var e = window.event; // this is the actual "drag code"
		
	// We need to confine the drag to the area of the slider
	var y = _offsetY + e.clientY - _startY;
	if (y < 224) y = 224;
	if (y> 297) y = 297;
	_dragElement.style.top = y + 'px';
	_curr_pos = Math.round((297 - y) / 8) + 1;
	doZoom("" + _curr_pos);
 }

function ZoomThumbMouseUp(e)
{
	if (_dragElement != null)
	{
		_dragElement.style.zIndex = _oldZIndex;
		// we're done with these events until the next OnMouseDown
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;
		// this is how we know we're not dragging
		_dragElement = null;
		
		doZoom("" + _curr_pos);
	} 
}

function ExtractNumber(value)
{
	var n = parseInt(value);
	return n == null || isNaN(n) ? 0 : n;
}
 
 //
 // for editting exhibits
 //

var focusedFieldId = '';
 
function focusField()
{
	document.getElementById(focusedFieldId).focus();
}

function doPopupFormSubmit(form_id)
{
    Effect.Fade(form_id+ "_div", { duration: 0.0 });

	var form = document.getElementById(form_id);
	form.submit();
}

//function change_text(exhibit_id, page_num, element_id, parent_id)
//{
//	new Effect.Appear('text_area_form_div', { duration: 0.5 }); 
//	moveObjectToJustBelowItsParent('text_area_form_div', parent_id);
//	
//	document.getElementById('exhibit_id').value = exhibit_id;
//	document.getElementById('page_num').value = page_num;
//	document.getElementById('element_id').value = element_id;
//	var arrDiv = $(parent_id).getElementsByTagName('div');
//	if (arrDiv.length > 0)
//		var existing_note = arrDiv[0].innerHTML;
//	else
//		var existing_note = document.getElementById(parent_id).innerHTML;
//	existing_note = existing_note.gsub("<br />", "\n");
//	existing_note = existing_note.gsub("<br>", "\n");
//	document.getElementById('text').value = existing_note;
//	focusedFieldId = 'text_area_form_div';
//	setTimeout(focusField, 100);	// We need to delay setting the focus because the annotation isn't on the screen until the Effect.Appear has finished.
//}

//function change_header(exhibit_id, page_num, element_id, parent_id)
//{
//	new Effect.Appear('header_form_div', { duration: 0.5 }); 
//	moveObjectToJustBelowItsParent('header_form_div', parent_id);
//	
//	document.getElementById('head_exhibit_id').value = exhibit_id;
//	document.getElementById('head_page_num').value = page_num;
//	document.getElementById('head_element_id').value = element_id
//	var existing_note = document.getElementById(parent_id).innerHTML;
//	var arrH3 = $(parent_id).getElementsByTagName('h3');
//	if (arrH3.length > 0)
//	{
//		for (var i = 0; i < arrH3.length; i++)
//		{
//			if (arrH3[i].className == 'exhibit_header')
//				existing_note = arrH3[i].innerHTML.strip();
//		}
//	}
//		
//	document.getElementById('header').value = existing_note;
//	focusedFieldId = 'header_form_div';
//	setTimeout(focusField, 100);	// We need to delay setting the focus because the annotation isn't on the screen until the Effect.Appear has finished.
//}

