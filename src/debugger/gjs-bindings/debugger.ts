export const gjsDebuggerBinding = (breakpointProgram: string) => /** Js */ `
class Debugger{
    static encodeMessage(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            let hex = input.charCodeAt(i).toString(16);
            output += ("0" + hex).slice(-2);
        }
        return output;
    }

    static breakpoint(data) {
        GLib.spawn_command_line_sync(
            "${breakpointProgram} "+this.encodeMessage(JSON.stringify(data))
        );
    }
}
`;
