var Toolbar = {
	components: {'toolbar-item': ToolbarItem},
	template: `
		<div id="main-toolbar" class="toolbar">
			<toolbar-item id="activity-button" v-bind:title="l10n.stringActivity"></toolbar-item>
			<toolbar-item isSplitbar="true"></toolbar-item>


			<toolbar-item v-on:clicked="getApp().onStop()" id="stop-button" title="Stop" toRight="true"></toolbar-item>
			<toolbar-item ref="fullscreen" v-on:clicked="getApp().fullscreen()" id="fullscreen-button" v-bind:title="l10n.stringFullscreen" toRight="true"></toolbar-item>
			<toolbar-item v-on:clicked="getApp().onHelp()" id="help-button" v-bind:title="l10n.stringHelp" toRight="true"></toolbar-item>
		</div>
	`,
	data: function() {
		return {
			l10n: {
				stringActivity: '',
				stringHelp: '',
				stringFullscreen: '',
			}
		}
	},
	methods: {
		localized: function(localization) {
			var vm = this;
			Object.keys(this.l10n).forEach(function(key, index) {
				vm.l10n[key] = localization.get(key.substr(6));
			});
		},

		getApp: function() {
			return app;
		},

	}
}

var ToolbarItem = {
	template: `
		<div class="splitbar" v-if="isSplitbar"/>
		<button v-on:click="onClick()" v-bind:id="id" v-bind:title="title" v-bind:class="toRight ? 'toolbutton pull-right' : 'toolbutton'" v-else/>
	`,
	props: ['id', 'title', 'isSplitbar', 'toRight'],
	methods: {
		onClick: function() {
			this.$emit('clicked');
		}
	}
}