import _Vue from 'vue';

export function subscribe(params: IManualSubscription) {
  const http = new XMLHttpRequest();

  http.addEventListener('readystatechange', (event: Event) => {
    const target: XMLHttpRequest = <XMLHttpRequest> event.target;
    
    if (http.readyState === XMLHttpRequest.DONE) {
      const message = JSON.parse(target.responseText);

      params.callback(message.data, message.auth);
    }
  });

  http.open('POST', params.url, true);

  var request;

  if (params.files) {
    request = new FormData();

    for (var i = 0; i < params.files.length; i++) {
      request.append(`file-${i}`, params.files[i]);
    }

    request.append('event', params.event);
    request.append('data', params.data);
  } else {
    request = JSON.stringify({
      event: params.event,
      data: params.data
    });

    http.setRequestHeader('Content-Type', 'application/json');
  }
  http.withCredentials = true;
  http.send(request);
}

export default {
  install: (Vue: typeof _Vue, options: IOptions) => {

    var events: any = {};

    const url = options?.url !== undefined ? options.url : `http://192.168.178.30:3000/burst`;

    Vue.mixin({
      mounted: function() {
        if (!(<any>this).$options.events) { return; }

        const instance: any = this;        
        const props: any = instance.$options;

        if (props.events) {
          Object.keys(props.events).forEach(key => {
            events = {
              ...events,
              [key]: [{
                cp: instance.$vnode.tag,
                cb: props.events[key].bind(instance)
              }]
            }
          });
        }
      }
    });

    Vue.prototype.$request = {
      getEvent(event: string) {
        return events[event];
      },

      emitEvent(eventName: string, params?: any) {
        const event = Vue.prototype.$request.getEvent(eventName);
        
        if (event) {
          for (var i = 0; i < event.length; i++) {
            event[i].cb(params);
          }
        }
      },

      subscribe(params: ISubscription): void {
        const http = new XMLHttpRequest();

        http.addEventListener('readystatechange', (event: Event) => {
          const target: XMLHttpRequest = <XMLHttpRequest> event.target;
          
          if (http.readyState === XMLHttpRequest.DONE) {
            const message = JSON.parse(target.responseText);

            if (options.store && options.authAction) {
              options.store.dispatch(options.authAction, message.auth);
            }

            if (params.callback) {
              params.callback(message.data, message.auth);
            } else {
              const callback = Vue.prototype.$request.getEvent([message.event]);
              
              if (callback) {
                for (var i = 0; i < callback.length; i++) {
                  callback[i].cb(message.data, message.auth);
                }
              }
            }
          }
        });
    
        http.open('POST', url, true);

        var request;

        if (params.files) {
          request = new FormData();

          for (var i = 0; i < params.files.length; i++) {
            request.append(`file-${i}`, params.files[i]);
          }

          request.append('event', params.event);
          request.append('data', params.data);
        } else {
          request = JSON.stringify({
            event: params.event,
            data: params.data
          });

          http.setRequestHeader('Content-Type', 'application/json');
        }
        http.withCredentials = true;
        http.send(request);
      }
    }
  }
}

interface IOptions {
  url: string;
  store: any;
  authAction: string;
}

interface ISubscription {
  event: string;
  data?: any;
  files?: any;
  callback?: (data: any, authorized: boolean) => void;
}

interface IManualSubscription extends ISubscription {
  url: string;
  callback: (data: any, authorized: boolean) => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $request: {
      getEvent(event: string): any;
      subscribe(params: ISubscription): void;
      emitEvent(eventName: string, params?: any): void;
    };
  }
}

interface IEvents {
  [key: string]: (data: any, authorized: boolean) => void;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    events?: IEvents;
  }
}
