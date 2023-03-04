const loadData = async (dataLimit) => {
  toggleSpinner(true);
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools, dataLimit);
};

const displayData = (courses, dataLimit) => {
  
  const cardContainer = document.getElementById("course-container");
  cardContainer.textContent = "";
  const seeMore = document.getElementById("see-more");
  if (courses.length && dataLimit) {
    courses = courses.slice(0, 6);
    seeMore.classList.remove("d-none");
  } else {
    seeMore.classList.add("d-none");
  }

  courses.forEach((course) => {
    const coursesDiv = document.createElement("div");

    coursesDiv.classList.add("col");

    coursesDiv.innerHTML = `
        
                <div class="col">
                  <div class="card h-100" >
                    <img src="${
                      course?.image
                    }" class="card-img-top" alt="..." style="height: 300px; border-radius: 16px;">
                    <div class="card-body">
                      <h5 class="card-title" style="font-size: 25px; font-weight: 600; color: #111111;">Features</h5>
                      <p class="card-text" style="color: #585858;">
                      1.${course?.features[0]}
                      </p>
                      <p class="card-text" style="color: #585858;">
                      2.${course?.features[0]}
                      </p>
                      <p class="card-text" style="color: #585858;">
                      3.${course?.features[0]}
                      </p>
                    </div>
                    <div class="card-footer d-flex flex-row align-items-center  justify-content-between">
                       <div>
                       <h5 class="card-title" style="font-size: 25px; font-weight: 600; color: #111111;">${
                         course?.name ? course?.name : "NO Name Found"
                       }</h5>
                        <p class="card-text d-flex flex-row align-items-center gap-2" style="color: #585858; font-weight: 500;">
                         <i class="bi bi-calendar2-week"></i>
                      ${course?.published_in}
                      </p>
                       </div>
                       <div>
                      
                       <button onclick="loadCourseDetails('${
                         course?.id
                       }')" href="#" class="border-0" data-bs-toggle="modal" data-bs-target="#courseDetailsModal"> <i class="bi bi-arrow-right" style="color: #EB5757; font-size: 22px; font-weight: 600;"></i></button>
                       
                       </div>
                    </div>
                  </div>
                </div>
        `;
    cardContainer.appendChild(coursesDiv);
  });
  toggleSpinner(false);
};

const loadCourseDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => displayCourseDetails(data.data));
};
const clear = () => {
  const courseDetails = document.getElementById("course-details");
  courseDetails.textContent = "";
};
const displayCourseDetails = (course) => {
  console.log(course);
  const courseDetails = document.getElementById("course-details");
  courseDetails.innerHTML = `
   
    <div  class="d-flex justify-content-center align-items-start gap-5  align-items-center flex-column flex-lg-row">
        <div id="modal-left" class="mb-3 mb-lg-0 "  style="border: 1px solid #EB5757; border-radius: 15px; padding: 10px; background: rgba(235, 87, 87, 0.05);">
          <h3 style="font-size: 25; color: #111111; font-weight: 600">
            ${course.description ? course.description : "No Data Found"}
          </h3>
          <div class="d-flex flex-row align-items-center justify-content-center py-3 gap-5">
            <p style="color: #03a30a; font-weight: bold">
              ${
                course.pricing ? course.pricing[0].price : "Free of Cost"
              } <br />
              ${course.pricing ? course.pricing[0].plan : "/Basic"}<br />
              
            </p>
            <p style="color: #F28927; font-weight: bold">
              ${
                course.pricing ? course.pricing[1].price : "Free of Cost"
              } <br />
              ${course.pricing ? course.pricing[1].plan : "/Pro"}<br />
            </p>
            <p style="color: #EB5757;
 font-weight: bold">
              ${
                course.pricing ? course.pricing[2].price : "Free of Cost"
              } <br />
              ${course.pricing ? course.pricing[2].plan : "/Enterprise"}<br />
            </p>
          </div>
          <div class="d-flex flex-row align-items-center justify-content-around ">
            <div>
               <h3 style="font-size: 25; color: #111111; font-weight: 600">
            Features
          </h3>
          
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.features[1].feature_name
            }</li>
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.features[2].feature_name
            }</li>
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.features[3].feature_name
            }</li>
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.features[4]
                ? course.features[4].feature_name
                : "No Data Found"
            }</li>
           
           
          
            </div>
            <div>
              <h3 style="font-size: 25; color: #111111; font-weight: 600">
            Integrations
          </h3>
          <li style="color: #585858; font-weight: 400; font-size: 16px;">${
            course.integrations ? course.integrations[0] : "No Data found"
          }</li>
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.integrations ? course.integrations[1] : "No Data found"
            }</li>
            <li style="color: #585858; font-weight: 400; font-size: 16px;">${
              course.integrations ? course.integrations[2] : "No Data found"
            }</li>
            </div>
          </div>
        </div>
        <div class="col">
                  <div class="card h-100" >
                    <img src=${
                      course.image_link[0]
                    } class="card-img-top" alt="..." style="height: 300px; border-radius: 16px;">
                    <div class="card-body" style="text-align: center;">
                      <h5 class="card-title" style="font-size: 25px; font-weight: 600; color: #111111;">${
                        course.input_output_examples
                          ? course.input_output_examples[0].input
                          : "Can you give any example?"
                      }</h5>
                      <p class="card-text" style="color: #585858;">
                     ${
                       course.input_output_examples
                         ? course.input_output_examples[0].output
                         : "No! Not Yet! Take a break!!!"
                     }
                      </p>
                      
                    </div>
                    
                  </div>
                </div>
      </div>
   `;
};

const toggleSpinner = (isLoading) => {
  const loadSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadSpinner.classList.remove("d-none");
  } else {
    loadSpinner.classList.add("d-none");
  }
};

const showMoreData = () => {
  loadData(!true);
};



loadData(true);
