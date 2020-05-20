import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  computed: {
    foo: {
      get() {
        return this.$store.getters['ui/tab'];
      },
      set(value) {
        this.$store.dispatch('ui/setTab', value);
      }
    }
  },
  methods: {
    ...mapActions('ui', ['toggleSidebar']),
  },
})
export default class HeaderComponent extends Vue {
  fullscreen: boolean = false;
  
  toggleSidebar!: (arg?: any) => void;

  toggleFullscreen(elem?: Element) {
    elem = elem || document.documentElement;

    if (!(document as any).fullscreenElement && !(document as any).mozFullScreenElement && !(document as any).webkitFullscreenElement && !(document as any).msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
      }
      this.fullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      this.fullscreen = false;
    }
  }
}
