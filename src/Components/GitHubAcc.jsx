import React, { useEffect, useState } from "react";
import "./GitHubAcc.css";
import Assets from "./../assets/Images/icons8-github-128.png";

const GitHubAcc = () => {
  const[isError,setIsError] = useState("")
  const [IsRender,setIsRender] = useState(false)
  const [inputValue, setinputValue] = useState("");
  const [userData, setUserData] = useState({});
  const [githubUser, setGithubUser] = useState("")

 
 
  
  
  const OnClickHandler=(e)=>{
    e.preventDefault()
    
    if(!inputValue){

      setIsError("Please Enter Username")
      

    }
    else if(userData.message){
      setIsError(userData.message)
      }
    else{
      setGithubUser(inputValue)
      setinputValue("")
      setIsRender(true)
    }
  }

  useEffect(()=>{
  FetchApi();
}, [githubUser]);


const FetchApi = async ()=>{
  const response = await fetch(`https://api.github.com/users/${githubUser}`);
  const data = await response.json();
  setUserData(data);
};



  return (
    <>
    <div className="container">

      <div className="newhead">
        <img src={Assets} alt="done" />
        <h1>GitHub Finder</h1>
      </div>
      <div className="input">
        <input type="text" placeholder="Enter UserName" onChange={(e)=>{setinputValue(e.target.value)}} value={inputValue}/>
        <button onClick={OnClickHandler}>Search</button>
      </div>
      <span>{isError}</span>
      {IsRender &&
        <div className="section">
        <div className="leftsection">
          <div className="image ">
            <img src={userData.avatar_url? userData.avatar_url : Assets} alt="" height={150.5} />
          </div>
          <div className="loginName">
            <p>LoginName</p>
            <h3>{userData.login}</h3>
          </div>
          <div className="follows">
            <div className="followers">
              <h3>Followers</h3>
              <p>{userData.followers}</p>
            </div>
            <div className="following">
              <h3>Following</h3>
              <p>{userData.following}</p>
            </div>
          </div>
        </div>
        <div className="rightsection">
          <div className="name">
            <h3>Name</h3>
            <p>{userData.name}</p>
          </div>
          <div className="repos">
            <h3>Repositories</h3>
            <p>{userData.public_repos}</p>
          </div>
          <div className="company">
            <h3>Comapany</h3>
            <p>{userData.company ? userData.company : "------"}</p>
          </div>
          <div className="location">
            <h3>Location</h3>
            <p>{userData.location}</p>
          </div>
        </div>
      </div>
       }
    </div>
    </>
  );
};

export default GitHubAcc;
