import { useEffect, useState } from 'react';

function Results(props) {
  const [markets, setMarkets] = useState([]);
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    let mounted = true;
    fetch(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${props.zipcode}`)
    .then(data => data.json())
      .then(resp => {
        if(mounted) {
          resp.results.pop();
          setMarkets(resp.results)
        }
      });
    return () => mounted = false;
  }, [props.zipcode]);

  function onToggleDetails(evt) {
    let marketId = evt.target.dataset.marketid;
    if (marketData.hasOwnProperty(marketId) && marketData[marketId]["show"]) {
      marketData[marketId]["show"] = false;
      setMarketData(Object.assign({}, marketData));
    }
    else {
      if (!(marketData.hasOwnProperty(marketId))) {
        fetch(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${marketId}`)
        .then(data => data.json())
          .then(resp => {
            let newObj = {};
            newObj[""+marketId] = resp.marketdetails;
            newObj[""+marketId]["show"] = true;
            newObj[""+marketId]["Schedule"] = newObj[""+marketId]["Schedule"].replaceAll(";<br>", "\n");
            newObj[""+marketId]["Schedule"] = newObj[""+marketId]["Schedule"].replaceAll(" <br>", "");
            setMarketData(Object.assign({}, marketData, newObj));
          });
      }
      else {
        marketData[marketId]["show"] = true;
        setMarketData(Object.assign({}, marketData));
      }
    }
  }

  return (
    <div className="search-results">
      <ul className="flex flex-col justify-center items-center">
        {markets.map(item => 
          <li key={item.id} className="mt-4 w-full flex justify-center">
            <div className="max-w-sm w-full lg:max-w-full">
              <div className="border-t border-r border-b border-l border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal mr-3 ml-3">
                <div className="mb-8">
                  <p className="text-sm text-gray-600 flex items-center">
                    {item.marketname.substring(0, item.marketname.indexOf(" "))} miles away
                  </p>
                  <div className="flex justify-between items-center flex-col sm:flex-row">
                    <div className="text-gray-900 font-bold text-xl mb-2 sm:text-left text-center mr-2">{item.marketname.substring(item.marketname.indexOf(" "))}</div>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" data-marketid={item.id} onClick={onToggleDetails}>{marketData.hasOwnProperty("" + item.id) && marketData["" + item.id]["show"] ? "Hide Details" : "View Details"}</button>
                  </div>
                  {marketData.hasOwnProperty("" + item.id) && marketData["" + item.id]["show"] ? 
                    <div className="text-gray-700 text-base text-left mt-4">
                      <div><span className="font-bold"><svg width="18px" height="18px" viewBox="0 0 24 24" id="2723fdf8-22cd-4a3e-a5e2-3dd7646800c4" data-name="Livello 1"><g id="02f9f2c1-c5f9-4dfd-bbb7-918d15e8e05e" data-name="map pin"><path d="M11.9,1a8.6,8.6,0,0,0-8.6,8.6c0,4.35,7.2,12.05,8.42,13.33a0.24,0.24,0,0,0,.35,0c1.22-1.27,8.42-9,8.42-13.33A8.6,8.6,0,0,0,11.9,1Zm0,11.67A3.07,3.07,0,1,1,15,9.6,3.07,3.07,0,0,1,11.9,12.67Z"/></g></svg> Address:</span> <span>{marketData[""+item.id]['Address']} (<a href={marketData[""+item.id]['GoogleLink']} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-500 underline">View on Google Maps</a>)</span></div><br />
                      <div><span className="font-bold"><svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ic_fluent_food_24_filled" fill="#212121" fill-rule="nonzero"><path d="M18,3 C18.5128358,3 18.9355072,3.38604019 18.9932723,3.88337887 L19,4 L19,20 C19,20.5522847 18.5522847,21 18,21 C17.4871642,21 17.0644928,20.6139598 17.0067277,20.1166211 L17,20 L17,15 L16,15 C15.4871642,15 15.0644928,14.6139598 15.0067277,14.1166211 L15,14 L15,8 C15,5.790861 16.5,3 18,3 Z M12,3 C12.5128358,3 12.9355072,3.38604019 12.9932723,3.88337887 L13,4 L13,9 C13,10.8635652 11.7256022,12.429479 10.0007613,12.8737865 L10,20 C10,20.5522847 9.55228475,21 9,21 C8.48716416,21 8.06449284,20.6139598 8.00672773,20.1166211 L8,20 L8.00024347,12.8740452 C6.3387946,12.44653 5.09505441,10.9783996 5.00520459,9.20583575 L5,9 L5,4 C5,3.44771525 5.44771525,3 6,3 C6.51283584,3 6.93550716,3.38604019 6.99327227,3.88337887 L7,4 L7,9 C7,9.74025244 7.40216612,10.3865739 7.99992752,10.7323937 L8,4 C8,3.44771525 8.44771525,3 9,3 C9.51283584,3 9.93550716,3.38604019 9.99327227,3.88337887 L10,4 L10.0010775,10.7318119 C10.5523456,10.4124618 10.9370409,9.83744849 10.9929628,9.16897232 L11,9 L11,4 C11,3.44771525 11.4477153,3 12,3 Z" id="🎨-Color"></path></g></g></svg>Products:</span> <span>{marketData[""+item.id]['Products']}</span></div><br />
                      <div><span className="font-bold"><svg width="18px" height="18px" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 7h-2v6h6v-2h-4z"/></svg> Availability:</span> <span>{marketData[""+item.id]['Schedule']}</span></div>
                    </div> 
                    : <div></div>}
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Results;
