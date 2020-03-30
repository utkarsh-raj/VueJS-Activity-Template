requirejs.config({
	baseUrl: "lib"
});


var app = new Vue({
	el: '#app',
	components: { 'toolbar': Toolbar, 'localization': Localization, 'tutorial': Tutorial },
	data: {
		
	},

	created: function() {
		requirejs(["sugar-web/activity/activity", "sugar-web/env"], function(activity, env) {
			activity.setup();
		});
	},

	mounted: function() {
		var vm = this;
		requirejs(["sugar-web/activity/activity", "sugar-web/env"], function(activity, env) {
			env.getEnvironment(function(err, environment) {

			});
		});


		document.getElementById("unfullscreen-button").addEventListener('click', function() {
			vm.unfullscreen();
		});
	},

	updated: function() {
		if (this.currentView === EbookReader) {
			this.$refs.view.render(this.currentEpub, this.currentBook.location);
		}
	},

	methods: {

		localized: function() {
			this.$refs.toolbar.localized(this.$refs.localization);
			this.$refs.tutorial.localized(this.$refs.localization);
		},

		fullscreen: function() {
			document.getElementById("main-toolbar").style.opacity = 0;
			document.getElementById("canvas").style.top = "0px";
			document.getElementById("unfullscreen-button").style.visibility = "visible";

		},
		unfullscreen: function() {
			document.getElementById("main-toolbar").style.opacity = 1;
			document.getElementById("canvas").style.top = "55px";
			document.getElementById("unfullscreen-button").style.visibility = "hidden";

		},

		onHelp: function() {

			this.$refs.tutorial.show(options);
		},

		onStop: function() {
			// Save current library in Journal on Stop
			var vm = this;

			requirejs(["sugar-web/activity/activity"], function(activity) {
				console.log("writing...");
				var context = {

				};

				var jsonData = JSON.stringify(context);
				activity.getDatastoreObject().setDataAsText(jsonData);
				activity.getDatastoreObject().save(function(error) {
					if (error === null) {
						console.log("write done.");
					} else {
						console.log("write failed.");
					}
				});
			});
		}
	}
});
