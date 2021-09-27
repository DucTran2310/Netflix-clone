import React from "react";
import { HeaderContainer } from "containers/header";
import { FaqsContainer } from "../containers/faqs";
import { FooterContainer } from "../containers/footer";
import { JumbotronContainer } from "../containers/jumbotron";
import { Feature, OptForm } from "components";

export default function Home() {
    return (
        <div>
            <HeaderContainer>
                <Feature>
                    <Feature.Title>
                        Unlimited films, TV programmers and more.
                    </Feature.Title>
                    <OptForm>
                        <OptForm.Input placeholder="Email address" />
                        <OptForm.Button>Try it now</OptForm.Button>
                        <OptForm.Text>
                            Ready to watch? Enter your email to create or
                            restart your membership.
                        </OptForm.Text>
                    </OptForm>
                </Feature>
            </HeaderContainer>
            <JumbotronContainer />
            <FaqsContainer />
            <FooterContainer />
        </div>
    );
}
