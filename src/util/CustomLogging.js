
    export function inLog(title="",body = "") {
      console.log(`%c${title} ::: <<< %c${body}`, `color:green; font-weight:bold; font-size:1rem;`, `font-weight:bold;`);
    }

    export function outLog(title="",body ="") {
        console.log(`%c${title} ::: >>> %c${body}`, `color:green; font-weight:bold; font-size:1rem;`, `font-weight:bold;`)
    }
