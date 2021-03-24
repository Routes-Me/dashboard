
    export function inLog(title="",body = "") {
      console.log(`%c${title} ::: <=== ${body}`, `color:green; font-weight:bold; font-size:1rem;`);
    }

    export function outLog(title="",body ="") {
        console.log(`%c${title} ::: ===> ${body}`, `color:green; font-weight:bold; font-size:1rem;`)
    }
