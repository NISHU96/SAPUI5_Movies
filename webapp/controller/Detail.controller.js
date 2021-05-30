sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("com.movies.Movies.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.movies.Movies.view.Detail
		 */
		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("Detail").attachPatternMatched(this._onDetailMatched, this);
		},
		
		_onDetailMatched : function (oEvent) {
			var oView = this.getView(),
			    sMovieIndex = oEvent.getParameter("arguments")["movieId"],
			    sAppointmentIndex = oEvent.getParameter("arguments")["appointmentId"];
			
			oView.bindElement({
				path: "/movies/" + sMovieIndex + "/appointments/" + sAppointmentIndex,
				model: "movies",
		        events: {
		        	change : this._onBindingChange.bind(this)
		        }
			});
		},
		
		_onBindingChange: function () {
			var oView = this.getView(),
			    oElementBinding = oView.getElementBinding("movies"),
			    sPath = oElementBinding.getPath();
		   if(!oView.getModel("movies").getObject(sPath)) {
			UIComponent.getRouterFor(this).navTo("NotFound");	
		   }
		},
		
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash !== undefined){
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteMainPage",true);
			}
		}
	});

});