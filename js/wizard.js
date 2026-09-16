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

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  document.getElementById('formCategory').value = selectedCategory;
  document.getElementById('formLocation').value = document.getElementById('location').value.trim();
  document.getElementById('formStage').value = document.getElementById('stage').value;
  document.getElementById('formDetails').value = document.getElementById('details').value.trim();

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando solicitud…';
  formStatus.textContent = '';

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (!response.ok) {
      throw new Error(`Solicitud rechazada con estado ${response.status}`);
    }

    goToStep(4);
  } catch (error) {
    console.error('No fue posible enviar la solicitud:', error);
    formStatus.textContent = 'No pudimos enviar su solicitud. Inténtelo nuevamente o escriba a ingeargueta@indeasagt.com.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Solicitar Diagnóstico Técnico';
  }
}

function resetWizard() {
  document.getElementById('wizard-form').reset();
  document.getElementById('location').value = '';
  document.getElementById('stage').value = 'initial';
  document.getElementById('details').value = '';
  document.getElementById('form-status').textContent = '';
  selectedCategory = '';
  goToStep(1);
}
