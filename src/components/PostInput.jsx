function PostInput(){
  return(
    <>
     <div className="container d-flex justify-content-center">
     <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
     <div class="card-body">

     <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">@</span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
      </div>

      <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-2">
            <i class="bi bi-paperclip btn btn-outline-dark"></i>
            <button type="button" class="btn btn-outline-primary float-md-end">Post</button>
         </div>
      </div>

     </div>
    </div>
    </div>
    </>
  );
}

export default PostInput;