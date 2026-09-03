// Estado local del Wizard
let selectedCategory = '';
let currentStep = 1;

const diagnostics = {
  land: "Estudio técnico de valoración comercial y verificación física del predio.",
  energy: "Evaluación de pre-factibilidad técnica y modelado de recurso ecosistémico.",
  investment: "Dictamen técnico-financiero y gestión de riesgos de infraestructura."
};

function selectCategory(category) {
  selectedCategory = category;
  goToStep(2);
}

function goToStep(stepNumber) {
  // Ocultar todos los pasos
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.classList.remove('active');
  });

  // Mostrar paso actual
  const activeStep = document.getElementById(`step-${stepNumber}`);
  if (activeStep) {
    activeStep.classList.add('active');
  }

  currentStep = stepNumber;
  updateUI();
}

function updateUI() {
  // Actualizar barra de progreso y etiquetas
  const progressFill = document.getElementById('progress-fill');
  const stepLabel = document.getElementById('step-label');
  const stepTitle = document.getElementById('step-title');

  if (currentStep <= 3) {
    progressFill.style.width = `${(currentStep / 3) * 100}%`;
    stepLabel.innerText = `PASO ${currentStep} DE 3`;
    
    if (currentStep === 1) stepTitle.innerText = "Identificación del Proyecto";
    if (currentStep === 2) stepTitle.innerText = "Parámetros Técnicos";
    if (currentStep === 3) {
      stepTitle.innerText = "Contacto & Confirmación";
      
      // Actualizar cuadro de diagnóstico en el Paso 3
      const diagBox = document.getElementById('diagnostic-box');
      diagBox.innerHTML = `<strong>Diagnóstico Estimado:</strong> ${diagnostics[selectedCategory] || ''}`;
    }
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    category: selectedCategory,
    location: document.getElementById('location').value,
    stage: document.getElementById('stage').value,
    details: document.getElementById('details').value,
    name: document.getElementById('clientName').value,
    email: document.getElementById('clientEmail').value,
    phone: document.getElementById('clientPhone').value
  };

  console.log("Datos de la consulta técnica:", formData);
  
  // Aquí puedes enviar los datos a Netlify Forms o a tu correo
  goToStep(4);
}

function resetWizard() {
  document.getElementById('wizard-form').reset();
  selectedCategory = '';
  goToStep(1);
}