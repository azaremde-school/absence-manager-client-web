const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
export default function (msg: any, vm: any, trace: any) {
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}