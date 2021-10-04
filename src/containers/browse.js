import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SelectProfileContainer from "./profiles";
import { firebase } from "../lib/firebase.prod";
import { getAuth, signOut } from "firebase/auth";
import { Loading, Header, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import selectionFilter from "../utils/selection-filter";
import { FooterContainer } from "./footer";

export default function BrowseContainer() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState();
    const [slideRows, setSlideRows] = useState([]);
    const [category, setCategory] = useState();

    const auth = getAuth(firebase);

    const user = auth.currentUser || {};

    // console.log("profile", profile);
    function getMovies(category = "MovieSeries") {
        selectionFilter()
            .then(result => {
                setCategory(category);
                setSlideRows(result[category]);
            })
            .catch(err => {
                console.log(err);
            });
        return false;
    }
    // console.log(category);

    useEffect(() => {
        setTimeout(() => {
            // getMovies();
            setLoading(false);
        }, 3000);
        return false;
    }, [profile.displayName]);

    useEffect(() => {
        setTimeout(() => {
            getMovies();
        });
        return false;
    }, [profile.displayName]);

    useEffect(() => {
        if (slideRows && searchTerm) {
            // console.log(slideRows);
            const fuse = new Fuse(slideRows, {
                keys: ["data.description", "data.title", "data.genre"],
            });
            let results = fuse.search(searchTerm).map(item => {
                return item.item;
            });

            console.log(results);
            if (
                slideRows.length > 0 &&
                searchTerm.length > 0 &&
                results.length > 0
            ) {
                setSlideRows(results);
            } else {
                setSlideRows(category);
            }
        }
        return false;
    }, [searchTerm]);

    function handleSearch(currentTarget) {
        setSearchTerm(currentTarget);
    }

    // console.log(results);
    // console.log(slideRows);
    return profile.displayName ? (
        <>
            {loading ? (
                <Loading src={user.photoURL} />
            ) : (
                <Loading.ReleaseBody />
            )}
            <Header src="joker1" dontShowOnSmallViewPort>
                <Header.Frame>
                    {/* Navigation */}
                    <Header.Group>
                        <Header.Logo
                            to={ROUTES.HOME}
                            src={logo}
                            alt="Netflix"
                        />
                        <Header.TextLink
                            active={
                                category === "MovieSeries" ? "true" : "false"
                            }
                            onClick={() => getMovies("MovieSeries")}
                        >
                            Series
                        </Header.TextLink>
                        <Header.TextLink
                            active={
                                category === "MovieFilms" ? "true" : "false"
                            }
                            onClick={() => getMovies("MovieFilms")}
                        >
                            Films
                        </Header.TextLink>
                    </Header.Group>

                    {/* User and Search */}
                    <Header.Group>
                        {/* Search */}
                        <Header.Search
                            searchTerm={searchTerm}
                            // setSearchTerm={setSearchTerm}
                            handleSearch={handleSearch}
                        />
                        {/* Profile user */}
                        <Header.Profile>
                            <Header.Picture src={user.photoURL} />
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL} />
                                    <Header.TextLink>
                                        {user.displayName}
                                    </Header.TextLink>
                                </Header.Group>

                                <Header.Group>
                                    <Header.TextLink
                                        onClick={() => signOut(auth)}
                                    >
                                        Sign out
                                    </Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                    {/* Title film */}
                    <Header.FeatureCallOut>
                        Watch Joker Now !!!
                    </Header.FeatureCallOut>
                    {/* Description film */}
                    <Header.Text>
                        Forever alone in a crowd, failed comedian Arthur Fleck
                        seeks connection as he walks the streets of Gotham City.
                        Arthur wears two masks -- the one he paints for his day
                        job as a clown, and the guise he projects in a futile
                        attempt to feel like he's part of the world around him.
                    </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>

            <Card.Group>
                {slideRows.length > 0
                    ? slideRows.map(slideItem => (
                          <Card
                              key={`${category}-${slideItem.title.toLowerCase()}`}
                          >
                              <Card.Title>{slideItem.title}</Card.Title>
                              <Card.Entities>
                                  {slideItem.data.map(item => (
                                      <Card.Item key={item.id} item={item}>
                                          <Card.Image
                                              src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                                          />
                                          <Card.Meta>
                                              <Card.SubTitle>
                                                  {item.title}
                                              </Card.SubTitle>
                                              <Card.Text>
                                                  {item.description}
                                              </Card.Text>
                                          </Card.Meta>
                                      </Card.Item>
                                  ))}
                              </Card.Entities>
                              <Card.Feature category={category}>
                                  <Player>
                                      <Player.Button />
                                      <Player.Video src="/videos/bunny.mp4" />
                                  </Player>
                              </Card.Feature>
                          </Card>
                      ))
                    : false}
            </Card.Group>
            <FooterContainer />
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile} />
    );
}

// useEffect(() => {
//     onAuthStateChanged(auth, user => { //check user đã từng login/ register chưa
//         if (user) {
//             console.log("Hello", user);
//         } else {
//             console.log("Goodbye user");
//         }
//     });
// });
