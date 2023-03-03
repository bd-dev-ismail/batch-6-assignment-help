fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((res) => res.json())
  .then((data) => displayData(data.data.tools));

const displayData = (courses) => {
  console.log(courses, "test");
  const cardContainer = document.getElementById("course-container");
  cardContainer.textContent = "";
  if (courses.length) {
    courses.forEach((course) => {
      console.log(course, "single");
      const coursesDiv = document.createElement("div");

      coursesDiv.classList.add("col");

      coursesDiv.innerHTML = `
        
                <div class="col">
                  <div class="card h-100">
                    <img src="${course?.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <p class="card-text">
                      1.${course?.features[0]}
                      </p>
                      <p class="card-text">
                      2.${course?.features[0]}
                      </p>
                      <p class="card-text">
                      3.${course?.features[0]}
                      </p>
                    </div>
                    <div class="card-footer d-flex flex-row  justify-content-between">
                       <div>
                       <h5 class="card-title">${
                         course?.name ? course?.name : "NO Name Found"
                       }</h5>
                        <p class="card-text">
                      ${course?.published_in}
                      </p>
                       </div>
                       <div>
                       <button onclick="loadCourseDetails('${
                         course?.id
                       }')" href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#courseDetailsModal">Show Detalis</button>
                       </div>
                    </div>
                  </div>
                </div>
        `;
      cardContainer.appendChild(coursesDiv);
    });
  }
};

const loadCourseDetails = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => displayCourseDetails(data.data));
};

const displayCourseDetails = (course) => {
  console.log(course, "test");
   const modalTitle = document.getElementById("courseDetailsModalLabel");
   modalTitle.innerText = course?.tool_name ? course?.tool_name : "No Name Found";
   
};

displayData();
