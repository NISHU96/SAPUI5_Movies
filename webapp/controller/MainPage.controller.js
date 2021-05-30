sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Log, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.movies.Movies.controller.MainPage", {

		formatter: formatter,

		onInit: function () {
			Log.info("controller has been initialized");
		},

		onPress: function (oEvent) {
			sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
				var oResourceBundle =
					this.getOwnerComponent().getModel("i18n").getResourceBundle();
				oMessage.show(oResourceBundle.getText("search") + oEvent);
			}.bind(this));

			var sCity = this.byId('city').getValue(),
				sGenre = this.byId('genre').getSelectedItem().getKey(),
				oCalender = this.byId('calendar'),
				oRowBinding = oCalender.getBinding("rows"),
				oFilterGenre,
				oFilterCity;

			// create filters for genre and city according to the user inputs
			oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
			oFilterCity = sCity ? new Filter("info", FilterOperator.Contains, sCity) : null;

			//Apply genre filter to calender rows
			oRowBinding.filter(oFilterGenre);

			var aRows = oCalender.getAggregation("rows");
			aRows.forEach(function (oItem) {
				var oAppointmentsBinding = oItem.getBinding("appointments");
				oAppointmentsBinding.filter(oFilterCity);
			});
		},

		handleAppointmentSelect: function (oAppointment) {

			var oBindingContext = oAppointment.getBindingContext("movies"),
				oPath = oBindingContext.sPath;
			var aParameters = oPath.split('/');

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Detail", {
				movieId: aParameters[2],
				appointmentId: aParameters[4]
			});

		}
	});
});