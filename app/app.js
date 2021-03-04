'use strict';
let shopitem = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg' ,
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png' ,
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
  ];
  let buttonShowResult = document.getElementById('show_result');
  let ulShowResult = document.getElementById('show_data')
let imageSection = document.getElementById( 'results' );
let leftImage = document.getElementById( 'leftImage' );
let centertImage = document.getElementById( 'cinterImage' );
let rightImage = document.getElementById( 'rightImage' );
let ButtonCounter = document.getElementById( 'add' );
let textCounter = document.getElementById( 'counter' );

let clickArray=[];
let showArray=[];
let previousImg=[];

let leftGoatIndex = 0;
let rightGoatIndex = 0;
let cinterGoatIndex = 0;


let clickCounter = 0;
//this is an object
function item( name ) {
    this.name = name;
    this.image = `./img/${name}`;
    this.clicks = 0;
    this.show = 0;
    item.all.push( this );
    localStorage.setItem('data',JSON.stringify(item.all))

  }
  
  item.all = [];
  item.counter = 0;
  if(JSON.parse(localStorage.getItem('data'))){
    item.all = JSON.parse(localStorage.getItem('data'));

  }else
  {
    for( let i = 0; i < shopitem.length; i++ ) {
      new item( shopitem[i] );
      
    }
  }
  

 
  //this function is render  to show photo
  function renderNewGoat() {
    buttonShowResult.style.display='none';
    ulShowResult.style.display='none';
    let rightIndex;
    let centertIndex;
    let leftIndex ;
    do {
      leftIndex = randomNumber( 0, item.all.length - 1 );
    } while( leftIndex == rightIndex|| previousImg[0]==leftIndex||previousImg[1]==leftIndex||previousImg[2]==leftIndex);

    // let leftIndex = randomNumber( 0, item.all.length - 1 );
    leftImage.src = item.all[leftIndex].image;
    leftImage.alt = item.all[leftIndex].name;
    leftGoatIndex = leftIndex;

    
  
    
    do {
      rightIndex = randomNumber( 0, item.all.length - 1 );
    } while( leftIndex == rightIndex || previousImg[0]==rightIndex||previousImg[1]==rightIndex||previousImg[2]==rightIndex);

   
    
    rightImage.src = item.all[rightIndex].image;
    rightImage.alt = item.all[rightIndex].name;
    rightGoatIndex = rightIndex;
    
   
do {
    centertIndex = randomNumber( 0, item.all.length - 1 );
    } while( leftIndex == centertIndex || rightIndex == centertIndex || previousImg[0]==centertIndex||previousImg[1]==centertIndex||previousImg[2]==centertIndex);

    centertImage.src = item.all[centertIndex].image;
    centertImage.alt = item.all[centertIndex].name;
    cinterGoatIndex = rightIndex;
  

    previousImg[1]=rightIndex;
    previousImg[2]=centertIndex;
    previousImg[0]=leftIndex;

    item.all[leftIndex].show++;
    item.all[rightIndex].show++;
    item.all[centertIndex].show++;

  
  
    // rightImage.src = item.all[0].image;
  }
  //yhis function to calculate hou many number in text box and comper it in the if condeyion
  function bt1()
  {
   
    if(textCounter.value !=undefined && textCounter.value >0 && textCounter.value <=25)
    {
       clickCounter=textCounter.value-1;
      buttonShowResult.addEventListener('click',showData);

  
  imageSection.addEventListener( 'click', handelClick );
    }
    else{
      alert('please insert 1 to 25')
    }
  }
  function handelClick( event ) {
    
 


    if( item.counter <= clickCounter ) {
      
      const clickedElement = event.target;
      if( clickedElement.id == 'leftImage' || clickedElement.id == 'rightImage' || clickedElement.id =='cinterImage') {
        if( clickedElement.id == 'leftImage' ) {
          item.all[leftGoatIndex].clicks++;
        
        }
  
        if( clickedElement.id == 'rightImage' ) {
          item.all[rightGoatIndex].clicks++;
         

        }
        

        if( clickedElement.id == 'cinterImage' ) {
            item.all[cinterGoatIndex].clicks++;
        

          }
  
        item.counter++;
        renderNewGoat();
  
        console.log( item.all );
      }
    }else
    {
        buttonShowResult.style.display='block';
        for( let i = 0; i < item.all.length; i++ ) {
          showArray.push(item.all[i].show);
          clickArray.push(item.all[i].clicks);
       
         }
         localStorage.setItem('data',JSON.stringify(item.all))

    }
  
  }
  function showData(event)
  {
    ulShowResult.style.display='block';
    for(let y=0;y<item.all.length;y++){
        const liElement = document.createElement('li');
        ulShowResult.appendChild(liElement);
        liElement.textContent=item.all[y].name+' had '+ item.all[y].clicks+ ' votes, and was seen '+item.all[y].show+' times.'
    }
    buttonShowResult.removeEventListener('click',showData);
    
  
    imageSection.removeEventListener( 'click', handelClick); 
    showChart();

  }
 

  ButtonCounter.addEventListener( 'click', bt1 );
 
  console.log( 'ffdgfg',item.all );
  
  // Helper function
  function randomNumber( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  //this function to show chart
  function showChart()
  {
    var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {         
          labels: shopitem,
          datasets: [{
              label: '# of Votes',           
               data: clickArray,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1
          },
        
        
          {
            label: '# of Shown',          
             data: showArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }
        
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }







  renderNewGoat();

