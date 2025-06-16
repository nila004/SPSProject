document.addEventListener('DOMContentLoaded', function () {
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const uploadStatus = document.getElementById('uploadStatus');
  const modal = document.getElementById('uploadsModal');
  const viewUploadsBtn = document.getElementById('viewUploadsBtn');
  const closeBtn = document.querySelector('.close-btn');
  const uploadedImagesContainer = document.getElementById('uploadedImagesContainer');

  const previewModal = document.getElementById('imagePreviewModal');
  const previewImage = document.getElementById('previewImage');
  const previewCloseBtn = document.querySelector('.close-preview-btn');

  // Upload Button Click
  uploadBtn.addEventListener('click', function () {
    fileInput.click();
  });

  // File Selected
  fileInput.addEventListener('change', function (e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Type Validation
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        uploadStatus.textContent = 'Please select a PNG or JPG file';
        uploadStatus.style.color = 'red';
        return;
      }

      // Size Validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        uploadStatus.textContent = 'File size must be less than 5MB';
        uploadStatus.style.color = 'red';
        return;
      }

      uploadFile(file);
    }
  });

  function uploadFile(file) {
    uploadStatus.textContent = 'Uploading...';
    uploadStatus.style.color = '#039aa2';

    const formData = new FormData();
    formData.append('bill', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          uploadStatus.textContent = 'Upload successful!';
          uploadStatus.style.color = 'green';
          fetchUploadedBills(); // Refresh view
        } else {
          uploadStatus.textContent = 'Upload failed: ' + data.message;
          uploadStatus.style.color = 'red';
        }
      })
      .catch(err => {
        uploadStatus.textContent = 'Error: ' + err.message;
        uploadStatus.style.color = 'red';
      });
  }

  // Open uploaded bills modal
  viewUploadsBtn.addEventListener('click', function () {
    fetchUploadedBills();
    modal.style.display = 'block';
  });

  // Close modal
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
    if (e.target === previewModal) {
      previewModal.style.display = 'none';
    }
  });

  previewCloseBtn.addEventListener('click', function () {
    previewModal.style.display = 'none';
  });

  // Fetch and display uploaded bills
  function fetchUploadedBills() {
    fetch('/get-uploads')
      .then(res => res.json())
      .then(files => {
        uploadedImagesContainer.innerHTML = '';

        if (!files.length) {
          uploadedImagesContainer.innerHTML = '<p>No bills uploaded yet.</p>';
          return;
        }

        files.forEach(file => {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'image-item';

          const img = document.createElement('img');
          img.src = `/uploads/${file}`;
          img.alt = 'Uploaded bill';
          img.className = 'uploaded-image';

          const deleteBtn = document.createElement('span');
          deleteBtn.className = 'delete-btn';
          deleteBtn.innerHTML = '&times;';
          deleteBtn.title = 'Delete';

          deleteBtn.onclick = () => {
            if (confirm('Are you sure you want to delete this bill?')) {
              fetch(`/delete-upload/${file}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                  if (data.success) {
                    fetchUploadedBills();
                  } else {
                    alert('Delete failed: ' + data.message);
                  }
                })
                .catch(() => alert('Error deleting file'));
            }
          };

          img.onclick = () => {
            previewImage.src = img.src;
            previewModal.style.display = 'block';
          };

          imgContainer.appendChild(deleteBtn);
          imgContainer.appendChild(img);
          uploadedImagesContainer.appendChild(imgContainer);
        });
      })
      .catch(err => {
        console.error('Error fetching uploads:', err);
        uploadedImagesContainer.innerHTML = '<p>Error loading uploaded bills.</p>';
      });
  }

  // Animate status values
  const statusValues = document.querySelectorAll('.status-value');
  statusValues.forEach((value, index) => {
    let targetNumber = index === 0 ? 12450 : 8720.5;
    let currentNumber = 0;
    const increment = targetNumber / 20;

    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(timer);
      }
      value.textContent = `$${currentNumber.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }, 50);
  });
});
