function showHideSection(editor) {
  // editor.on("load", () => {
  //   document.querySelector('span[title="Settings"]').click();
  //   // const body = document.querySelector("iframe");
  //   // console.log(body.find("body")[0]);
  //   // // body.style.cssText = "margin:30px";
  //   // // debugger;
  //   // body.onclick = function () {
  //   //   console.log("body clicked");
  //   // };

  //   // const navbar = navbarComponent.view.$el;
  //   // console.log(navbar);
  //   // navbar.click(function () {
  //   //   document.querySelector('span[title="Settings"]').click();
  //   // });

  //   const components = editor.getComponents();

  //   const sections = components.filter((component) => {
  //     return component.get("tagName") === "section";
  //   });
  //   const sectionsAfter = sections.slice(1);
  //   // const setTraits = () => {
  //   //   for (i = 0; i < sectionsAfter.length; i--) {
  //   //     // console.log(sectionsAfter.length);
  //   //     traitObj = {
  //   //       traits: [
  //   //         {
  //   //           type: "checkbox",
  //   //           label: `Sec ${i + 1}`,
  //   //           changeProp: 1,
  //   //           name: "showSection",
  //   //         },
  //   //       ],
  //   //       showSection: "checked",
  //   //     };
  //   //   }
  //   // };

  //   // sectionsAfter
  //   //   .map((section, index) => {
  //   //     //sections means component

  //   //     return section.set({
  //   //       traits: [
  //   //         {
  //   //           type: "checkbox",
  //   //           label: `Sec ${index + 1}`,
  //   //           changeProp: 1,
  //   //           name: "showSection",
  //   //         },
  //   //       ],
  //   //       showSection: "checked",
  //   //     });
  //   //   })
  //   //   .join("");
  // });

  // const components = editor.getComponents();

  // const sections = components.filter((component) => {
  //   return component.get("tagName") === "section";
  // });

  editor.on(`component:selected`, (component) => {
    const components = editor.getComponents();

    const sections = components.filter((component) => {
      return component.get("tagName") === "section";
    });
    const sectionsAfter = sections.slice(1);
    const componentAttrs = {
      traits: sectionsAfter.map((section, index) => {
        return {
          type: "checkbox",
          label: `Show/Hide Sec ${
            section.attributes.attributes["data-app-name"] || ""
          }`,
          changeProp: 1,
          name: `showSection${
            section.attributes.attributes["data-app-name"] || ""
          }`,
        };
      }),
    };
    sectionsAfter.forEach((section) => {
      // if (
      //   componentAttrs[
      //     `showSection${section.attributes.attributes["data-app-name"]}`
      //   ] === " "
      // ) {
      //   componentAttrs[
      //     `showSection${section.attributes.attributes["data-app-name"]}`
      //   ] = "";
      // } else {
      // if(
      //   componentAttrs[
      //     `showSection${section.attributes.attributes["data-app-name"]}`
      //   ] ===""
      // )
      // }

      if (section.attributes.attributes["data-show"] === "true") {
        componentAttrs[
          `showSection${section.attributes.attributes["data-app-name"]}`
        ] = "checked";
      }
      if (section.attributes.attributes["data-show"] === "false") {
        componentAttrs[
          `showSection${section.attributes.attributes["data-app-name"]}`
        ] = "";
      }

      console.log(
        section.attributes.attributes["data-app-name"],
        componentAttrs[
          `showSection${section.attributes.attributes["data-app-name"]}`
        ],
        section.attributes.attributes["data-show"]
      );
    });
    // console.log(componentAttrs);
    component.set(componentAttrs);

    sectionsAfter.forEach((section) => {
      // console.log(section.attributes.attributes["data-app-name"]);
      return component.on(
        `change:showSection${section.attributes.attributes["data-app-name"]}`,
        (component) => {
          const value = component
            .getTrait(
              `showSection${section.attributes.attributes["data-app-name"]}`
            )
            .props().value;

          // console.log(value);
          if (!value) {
            section.setStyle({ display: "none" });
            console.log(
              "Before Clicked",
              section.attributes.attributes["data-show"]
            );

            section.attributes.attributes["data-show"] = "false";
            console.log(
              "After clicked",
              section.attributes.attributes["data-show"]
            );

            console.log("-----------------------------------");
          }
          if (value) {
            section.setStyle({ display: "initial" });
            console.log(
              "Before clicked",
              section.attributes.attributes["data-show"]
            );

            section.attributes.attributes["data-show"] = "true";
            console.log(
              "After clicked",
              section.attributes.attributes["data-show"]
            );
            console.log("----------------------------------");
          }
          // component.getTrait("showSection").props().value
          // console.log(component.setStyle({ display: "none" }));
        }
      );
    });
  });

  // editor.on("load", (component) => {
  //   const components = editor.getComponents();

  //   const sections = components.filter((component) => {
  //     return component.get("tagName") === "section";
  //   });

  //   const sectionsAfter = sections.slice(1);
  //   sectionsAfter
  //     .map((section, index) => {
  //       //sections means component

  //       return section.set({
  //         traits: [
  //           {
  //             type: "checkbox",
  //             label: `Sec ${index + 1}`,
  //             changeProp: 1,
  //             name: "showSection",
  //           },
  //         ],
  //         showSection: "checked",
  //       });
  //     })
  //     .join("");

  //   // const componentAttrs = {
  //   //   traits: sectionsAfter.map((section, index) => {
  //   //     component.set(componentAttrs);
  //   //     return {
  //   //       type: "checkbox",
  //   //       label: `Show/Hide Sec ${
  //   //         section.attributes.attributes["data-app-name"] || ""
  //   //       }`,
  //   //       changeProp: 1,
  //   //       name: `showSection${
  //   //         section.attributes.attributes["data-app-name"] || ""
  //   //       }`,
  //   //     };
  //   //   }),
  //   // };

  //   //setting traits
  //   sectionsAfter.forEach((section) => {
  //     // console.log(section.attributes.attributes["data-app-name"]);
  //     return component.on(
  //       `change:showSection${section.attributes.attributes["data-app-name"]}`,
  //       (component) => {
  //         const value = component
  //           .getTrait(
  //             `showSection${section.attributes.attributes["data-app-name"]}`
  //           )
  //           .props().value;

  //         // console.log(value);
  //         if (!value) {
  //           section.setStyle({ display: "none" });
  //           console.log(
  //             "Before:",
  //             section.attributes.attributes["data-app-name"],
  //             componentAttrs[
  //               `showSection${section.attributes.attributes["data-app-name"]}`
  //             ]
  //           );

  //           componentAttrs[
  //             `showSection${section.attributes.attributes["data-app-name"]}`
  //           ] = "";

  //           console.log(
  //             "After:",
  //             section.attributes.attributes["data-app-name"],
  //             componentAttrs[
  //               `showSection${section.attributes.attributes["data-app-name"]}`
  //             ]
  //           );
  //           // console.log(section.attributes.attributes["data-app-name"]);
  //         }
  //         if (value) {
  //           section.setStyle({ display: "initial" });
  //           // console.log(componentAttrs);
  //           console.log(
  //             "Before:",
  //             section.attributes.attributes["data-app-name"],
  //             componentAttrs[
  //               `showSection${section.attributes.attributes["data-app-name"]}`
  //             ]
  //           );
  //           componentAttrs[
  //             `showSection${section.attributes.attributes["data-app-name"]}`
  //           ] = "checked";

  //           console.log(
  //             "After:",
  //             section.attributes.attributes["data-app-name"],
  //             componentAttrs[
  //               `showSection${section.attributes.attributes["data-app-name"]}`
  //             ]
  //           );
  //           // section.attributes.attributes["data-app-name"] = "checked";
  //         }
  //         // component.getTrait("showSection").props().value
  //         // console.log(component.setStyle({ display: "none" }));
  //       }
  //     );
  //   });
  // });
}
