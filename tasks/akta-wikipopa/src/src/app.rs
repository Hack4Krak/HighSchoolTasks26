use yew::prelude::*;
use stylist::style;


mod navbar;
mod library_content;
mod footer;

#[component]
pub fn App() -> Html {
    let layout_style = style!(
        r#"
            display: flex;
            flex-direction: column;
            margin: 0;
        "#
    ).expect("failed to create app layout style");

    html! {
        <main class={layout_style}>
            <navbar::Navbar/>
            <library_content::LibraryContent/>
            <footer::Footer/>
        </main>
    }
}
