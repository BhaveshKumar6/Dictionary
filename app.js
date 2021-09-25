let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not_found')
let def = document.querySelector('.def');
let audio = document.querySelector('.audio');
let loading = document.querySelector('.loading');
let enterword = document.querySelector('.enterword');


searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    enterword.style.display = 'none';

    // clear old data 

    audio.innerHTML = '';
    notFound.innerText = '';
    def.innerText = '';
    
    // Get input data (word )

    let word = input.value;

    // call API for defination of Word

    if (word === ''){
        alert("Please Enter a Word");
        return;
    }

    getData(word);
})

async function getData(word){
    
    //  loading time we have to block it 
    loading.style.display = 'block';

    // call API for the Dictionary

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=2458cb49-9429-4d74-a10d-aa8b47eb1314`);
    const data = await response.json();

    // empty array word not found

    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No Result Found'; 
        return;
    }

    // if result is suggestions 

    if (typeof data[0] === 'string') {

        // for loading 
        loading.style.display = 'none';

        // create element h3 
        let heading = document.createElement('h3');
        // show did you mean 
        heading.innerText = 'Did You Mean ?';
        heading.classList.add('suggestheading');
        notFound.appendChild(heading); // append it in not Found section 
        
        // to suggestions 
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggestion');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);

        })
        return;
    }
        // Defination Found
        loading.style.display = 'none';
        let defination = data[0].shortdef[0];
        def.innerText  = defination;

        // for sound

        const  soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            renderSound(soundName);
        }

    
    //console.log(data);
}

function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0); // return sound first letter 
    
    // fetch sound 
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=2458cb49-9429-4d74-a10d-aa8b47eb1314`; 

    // create element to show inside the html audio
    let aud = document.createElement('audio');
    // to fetch sorce od sound 
    aud.src = soundSrc;
    // for controls 
    aud.controls = true;
    // append it 
    audio.appendChild(aud);
}