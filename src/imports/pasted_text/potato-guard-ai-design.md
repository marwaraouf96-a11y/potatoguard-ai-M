Design a complete, modern, responsive web platform called:

# PotatoGuard AI

**Tagline:**
Smarter Potato Health — From Field Image to Scientific Insight.

PotatoGuard AI is an AI-assisted potato leaf disease screening and agricultural research platform. It should serve two main audiences:

1. Farmers and agricultural workers who need a simple, practical way to screen potato leaf images and understand the next appropriate action.
2. Researchers, agronomists, students, and specialists who need transparent access to the model methodology, datasets, experiments, performance metrics, limitations, and scientific error analysis.

The platform must combine the visual identity of agriculture, plants, soil, and sustainability with the advanced appearance of artificial intelligence, deep learning, computer vision, and scientific research.

The website should not feel like a generic AI dashboard or a traditional farming website. It should feel like:

**Agriculture powered by transparent, responsible, and scientifically evaluated AI.**

---

# 1. Core Product Positioning

The platform is not a replacement for an agricultural expert and must not present its output as a guaranteed diagnosis.

Use language such as:

* AI-assisted screening.
* Most likely visual class.
* Preliminary field assessment.
* Scientific decision-support tool.
* Consult an agronomist when symptoms are severe or confidence is low.

Avoid statements such as:

* Guaranteed diagnosis.
* 100% accurate.
* Definitive disease confirmation.
* Automatic treatment prescription.

The system currently classifies potato leaf images into seven visual classes:

* Bacteria.
* Fungi.
* Healthy.
* Nematode.
* Pest.
* Phytophthora.
* Virus.

Important backend integration note:

The internal model class may currently be stored as `Phytopthora`. Preserve the exact internal class key when connecting the trained model, but display the scientifically corrected label `Phytophthora` in the user interface through an explicit display-name mapping.

---

# 2. Website Structure

Create the following primary navigation:

* Home
* Diagnose
* Live Scan
* Dashboard
* Disease Library
* Research
* About
* Contact

Under the Research navigation, create a structured submenu containing:

* Datasets
* Model Performance
* Methodology
* Error Analysis
* Explainability
* Research Findings
* Downloads

Add a visually prominent primary CTA in the navigation:

**Try the Model**

The navigation should remain sticky while scrolling.

On smaller screens, use a clean mobile menu with the Try the Model button clearly visible.

---

# 3. User Modes

Create two clearly differentiated experiences without making the website complicated.

## Farmer Mode

Farmer Mode should be simple, visual, reassuring, and action-oriented.

It should focus on:

* Taking or uploading a leaf photo.
* Receiving an understandable screening result.
* Understanding the confidence level.
* Viewing basic symptom information.
* Receiving safe next-step guidance.
* Saving a field case.
* Requesting expert review when needed.

## Researcher Mode

Researcher Mode should provide detailed scientific information, including:

* Dataset integrity.
* Duplicate auditing.
* Group-aware splitting.
* Experiment comparisons.
* Per-class metrics.
* Confusion matrices.
* Confidence intervals.
* Calibration.
* Error analysis.
* Grad-CAM.
* Reproducibility information.
* Model limitations.
* Downloadable model cards and reports.

Include a clear mode switch in the Dashboard:

**Farmer View | Research View**

Do not force visitors to create an account before trying the model.

---

# 4. Home Page

Design a visually powerful but credible landing page.

## Hero Section

Use a split-screen hero.

On one side, show a realistic close-up potato leaf with subtle disease spots. Add a refined AI scanning effect that follows the natural veins of the leaf.

The scanning effect should feel like computer vision and deep learning, not like a science-fiction weapon.

On the other side, display:

### Main headline

**Protect Potato Crops with Transparent AI**

### Supporting text

Upload or scan a potato leaf to receive an AI-assisted screening result, confidence analysis, and visual explanation — supported by a scientifically evaluated deep-learning pipeline.

### Primary CTA

**Scan a Potato Leaf**

### Secondary CTA

**Explore the Research**

Add a small trust statement:

**Seven visual classes · Research-grade evaluation · Explainable predictions**

## Scientific Metric Strip

Display a transparent research metric strip using the actual project results:

* 3,076 raw images reviewed.
* 3,000 audited modelling images.
* 7 visual classes.
* 429 held-out test images.
* 83.45% held-out test accuracy.
* 83.66% Test Macro F1.
* 85.11% balanced accuracy.
* 3.85% Expected Calibration Error.

Label these clearly as project evaluation results, not guaranteed future performance.

Include a tooltip explaining that real-world performance may differ because of lighting, image quality, backgrounds, geography, and field conditions.

## How It Works

Create a four-step horizontal process:

1. **Capture**
   Take a clear photo of one potato leaf.

2. **Analyze**
   The deep-learning model examines the visual patterns.

3. **Understand**
   Receive the likely class, confidence, alternatives, and visual explanation.

4. **Act Responsibly**
   Review field guidance or consult an agricultural specialist.

## Farmer Value Section

Create three benefit cards:

### Fast Preliminary Screening

Identify the most likely visual condition without waiting for a laboratory result.

### Understand Model Confidence

Know whether the prediction is confident, moderate, or uncertain.

### Build a Field Record

Save scans and monitor repeated observations from the same field.

## Research Transparency Section

Show an interactive horizontal research pipeline:

Raw Dataset
→ Corrupted Image Audit
→ Exact Duplicate Audit
→ Near-Duplicate Grouping
→ Group-Aware Split
→ Transfer Learning
→ Validation-Based Model Selection
→ Held-Out Test Evaluation
→ Error Analysis
→ Grad-CAM and Deployment

This section should communicate that the project is more than a single model experiment.

## Disease Preview Section

Show seven elegant disease cards with representative placeholder images:

* Bacteria.
* Fungi.
* Healthy.
* Nematode.
* Pest.
* Phytophthora.
* Virus.

Each card should contain:

* Class name.
* One-line visual description.
* Explore button.
* Clear label stating that visual similarity alone cannot confirm biological cause.

## Responsible AI Statement

Add a visible section near the bottom:

**AI supports field decisions — it does not replace agricultural expertise.**

Explain that low-confidence, unusual, or severe cases should be reviewed by an agronomist or laboratory.

---

# 5. AI Demo / Diagnose Page

Route:

`/diagnose`

This is the most important farmer-facing page.

## Upload Area

Create a large drag-and-drop upload component.

Supported actions:

* Upload from device.
* Take a photo using the phone camera.
* Use a prepared demonstration image.

Display capture guidance before analysis:

* Photograph one main potato leaf.
* Use natural or balanced lighting.
* Avoid motion blur.
* Keep the leaf reasonably close.
* Avoid covering symptoms with hands.
* Avoid placing many overlapping leaves in the frame.

Include an image-quality checklist with visual indicators:

* Leaf visible.
* Image sharpness.
* Lighting quality.
* Supported image format.
* Image resolution.

## Analysis State

After upload, display a sophisticated but calm analysis animation:

* Leaf preview.
* Soft scanning beam.
* Animated leaf-vein network.
* Status messages such as:

  * Checking image quality.
  * Preparing image.
  * Running visual classification.
  * Calculating confidence.
  * Generating explanation.

Do not display fake scientific stages that do not exist in the model.

## Prediction Result

The result page should include:

### Primary Result Card

* Most likely visual class.
* Confidence percentage.
* Confidence label:

  * High confidence.
  * Moderate confidence.
  * Uncertain result.
* Short plain-language explanation.
* Timestamp.
* Model version.

Example:

**Most likely class: Fungi**

**Confidence: 78% — Moderate**

The visual characteristics in this image are most consistent with the Fungi class in the training dataset.

AI-assisted screening only. Confirm important field decisions with an agricultural specialist.

## Top Three Predictions

Display the top three probabilities as horizontal bars.

Example:

* Fungi: 78%.
* Pest: 15%.
* Virus: 4%.

This helps users understand ambiguity instead of showing only one answer.

## Explainability Panel

Add a toggle:

**Show AI Attention Map**

Display:

* Original image.
* Grad-CAM heatmap.
* Blended comparison.
* Short explanation of what Grad-CAM means.

Use this disclaimer:

The highlighted area indicates where the model focused while producing the prediction. It does not prove that this region is biologically responsible for the disease.

## Confidence and Uncertainty

Do not use a permanently invented threshold.

Create a configurable confidence policy that will later be defined using validation and calibration results.

When confidence is considered insufficient, display:

**The system is not confident enough to provide a reliable screening result.**

Suggested actions:

* Retake the photo.
* Improve lighting.
* Capture one leaf at a closer distance.
* Submit the case for expert review.

## Result Actions

Add buttons:

* Save Case.
* Download Case Report.
* Scan Another Leaf.
* View Disease Information.
* Request Expert Review.
* Contribute Anonymously to Research.

The research contribution option must be opt-in and unchecked by default.

---

# 6. Live Scan Page

Route:

`/live`

Name the feature:

**Live Leaf Scan — Beta**

The current trained system is an image classifier, not an object-detection model. Therefore, do not fake bounding boxes around diseases.

The Live Scan experience should work as camera-assisted frame classification.

## Interface

Display:

* Full camera preview.
* Leaf-shaped framing guide.
* Lighting quality indicator.
* Stability indicator.
* Capture button.
* Auto-capture option when the image is stable.
* Switch camera button.
* Flash control when supported.

The user captures a frame, and the system analyzes that frame.

Optional future functionality may periodically analyze selected frames, but do not imply continuous medical-grade detection.

## Live Result Overlay

After a frame is analyzed, show:

* Most likely class.
* Confidence.
* Retake button.
* Save result.
* More details.

If the frame quality is insufficient, display capture advice instead of forcing a prediction.

---

# 7. Farmer Dashboard

Route:

`/dashboard`

The Dashboard should support an optional user account.

## Farmer Overview

Display:

* Total scans.
* Recent scans.
* High-confidence cases.
* Uncertain cases.
* Cases awaiting expert review.
* Most frequently observed class.
* Date filters.

## Case History

Create a searchable and filterable table or card list containing:

* Leaf thumbnail.
* Date.
* Field or plot name.
* Predicted class.
* Confidence.
* Expert-review status.
* Notes.
* Open report action.

## Field Case Details

Each saved case should contain:

* Original image.
* Prediction.
* Top-three probabilities.
* Grad-CAM image.
* Image-quality status.
* User notes.
* Optional field identifier.
* Optional general region.
* Expert feedback.
* Model version.
* Consent status.

Do not request precise GPS location by default.

## Trend Visualizations

Provide charts such as:

* Observations over time.
* Class distribution among saved scans.
* Confidence distribution.
* Uncertain-case rate.

Clearly state that these charts represent uploaded observations, not confirmed disease prevalence.

## Report Export

Allow users to export a professional PDF case report with:

* Case ID.
* Image.
* Date.
* AI-assisted result.
* Confidence.
* Alternative classes.
* Attention map.
* User notes.
* Responsible-use disclaimer.

---

# 8. Disease Library

Route:

`/diseases`

Create a farmer-friendly knowledge center for all seven classes.

Each disease page should include:

* Class name.
* Arabic and English display names.
* Representative image gallery.
* Common visible patterns.
* Conditions that may look similar.
* What the AI model can and cannot detect.
* Recommended observation steps.
* When expert consultation is important.
* Related model confusion patterns.
* References or expert-reviewed sources.

Do not automatically generate pesticide or chemical-treatment prescriptions.

Any treatment content must later be written or reviewed by a qualified agricultural specialist and adapted to local regulations.

Add a comparison tool:

**Compare Two Conditions**

For example:

* Fungi vs Pest.
* Fungi vs Phytophthora.
* Virus vs Fungi.
* Pest vs Healthy.

These comparisons are especially important because the project error analysis identified visual confusion between these classes.

---

# 9. Research Dashboard

Inside the main Dashboard, add a Research View or use:

`/research/dashboard`

## Main Research Cards

Display:

* Raw images: 3,076.
* Audited modelling images: 3,000.
* Training images: 2,143.
* Validation images: 428.
* Test images: 429.
* Number of classes: 7.
* Selected model.
* Test accuracy.
* Macro F1.
* Balanced accuracy.
* MCC.
* Calibration metrics.

## Dataset Integrity Visualization

Create a visual pipeline showing:

* Corrupted-image check.
* Exact SHA-256 duplicate detection.
* Cross-label duplicate conflict review.
* Perceptual-hash grouping.
* Near-duplicate removal.
* Group-aware splitting.
* Persistent split manifest.

## Class Distribution

Create an interactive bar chart showing class support.

Make the minority classes visually clear, especially Nematode and Healthy.

Add a note explaining that class weighting improves balance but cannot create new biological diversity.

## Split Integrity

Display:

* Train: 2,143 images — 71.4%.
* Validation: 428 images — 14.3%.
* Test: 429 images — 14.3%.

Add badges:

* Group-aware.
* Leakage audited.
* Reproducible seed.
* Test isolated until final evaluation.

---

# 10. Datasets Page

Route:

`/datasets`

The page should present the dataset scientifically rather than as a simple download page.

## Dataset Overview

Include:

* Dataset purpose.
* Source.
* Number of raw images.
* Number of audited images.
* Image dimensions.
* Class list.
* Class distribution.
* Supported formats.
* Known limitations.

## Data Audit Timeline

Visualize:

1. Raw data acquisition.
2. File validation.
3. Corrupted-image audit.
4. Exact duplicate hashing.
5. Cross-label conflict review.
6. Perceptual similarity audit.
7. Visual grouping.
8. Clean modelling table.
9. Group-aware split.
10. Persistent split manifest.

## Dataset Explorer

Create an optional research-only image explorer with:

* Class filter.
* Split filter.
* Audit-status filter.
* Image-dimension information.
* Visual-group identifier.
* Duplicate status.

Do not expose private file paths.

Do not add a public download button unless the dataset license permits redistribution.

Instead, provide:

* View original dataset source.
* View dataset card.
* View audit methodology.
* Download split manifest when allowed.

## Dataset Limitations

Clearly show:

* Limited number of independent field environments.
* Small support for some classes.
* Possible remaining label ambiguity.
* Lack of true farm, plant, date, or acquisition-session identifiers.
* Need for external validation.

---

# 11. Model Performance Page

Route:

`/model-performance`

This should be one of the strongest and most transparent pages.

## Important Model Naming

The project benchmark contains:

### Experiment A

EfficientNetB3 without class weighting.

### Experiment B

EfficientNetB3 with effective-number class weighting.

### Experiment C

ConvNeXtTiny with effective-number class weighting.

The current notebook selected Experiment C as the final candidate using Validation Macro F1 before inspecting Test labels.

Do not state that EfficientNetB3 is the final deployed model unless the actual deployment artifact is changed.

## Model Comparison

Create an interactive comparison table:

| Experiment | Backbone | Class Weighting | Validation Accuracy | Validation Macro F1 | Selection Status |
| ---------- | -------- | --------------- | ------------------: | ------------------: | ---------------- |

Populate exact values from the exported project files.

Show the scientific findings:

* Class weighting increased Macro F1 slightly while reducing overall Accuracy slightly.
* Changing the weighted backbone from EfficientNetB3 to ConvNeXtTiny produced a larger Macro F1 improvement.
* The ensemble search did not outperform the strongest single model.
* Experiment C was therefore selected.

## Final Held-Out Test Metrics

Use the actual final metrics:

* Accuracy: 83.45%.
* Balanced Accuracy: 85.11%.
* Macro Precision: 82.77%.
* Macro Recall: 85.11%.
* Macro F1: 83.66%.
* MCC: 79.89%.

## Confidence Intervals

Display the bootstrap 95% confidence intervals:

* Accuracy: 79.95% to 86.95%.
* Balanced Accuracy: 80.37% to 88.99%.
* Macro F1: 79.69% to 87.61%.
* MCC: 75.65% to 84.10%.

Visually distinguish point estimates from uncertainty ranges.

Do not display “90% accuracy” because the held-out test result does not support that claim.

## Per-Class Results

Create an interactive per-class performance table:

| Class        | Precision | Recall | F1-score | Test Support |
| ------------ | --------: | -----: | -------: | -----------: |
| Bacteria     |    100.0% |  90.1% |    94.8% |           81 |
| Fungi        |     77.7% |  82.9% |    80.2% |          105 |
| Healthy      |     73.0% |  93.1% |    81.8% |           29 |
| Nematode     |     80.0% |  88.9% |    84.2% |            9 |
| Pest         |     84.4% |  76.5% |    80.2% |           85 |
| Phytophthora |     84.1% |  84.1% |    84.1% |           44 |
| Virus        |     80.3% |  80.3% |    80.3% |           76 |

Add a warning that Nematode has very low Test support, so its metric is more uncertain.

## Visual Analytics

Include:

* Training and validation learning curves.
* Confusion matrix.
* Normalized confusion matrix.
* Precision–Recall curves.
* ROC curves.
* Per-class recall chart.
* Calibration chart.
* Confidence histogram.
* Correct versus incorrect confidence distribution.

## Calibration

Display:

* Multiclass Brier Score: 0.2449.
* Expected Calibration Error: 0.0385.

Explain calibration in simple language:

A confidence score of 80% should ideally correspond to approximately 80% correctness among similar predictions.

---

# 12. Error Analysis Page

Route:

`/research/error-analysis`

This page should transform project mistakes into a scientific feature.

## Error Summary

Display:

* Test images: 429.
* Correct predictions: 358.
* Misclassified images: 71.
* Misclassification rate: 16.55%.

## Common Validation Confusions

Highlight:

* Pest → Fungi.
* Fungi → Pest.
* Fungi → Phytophthora.
* Virus → Fungi.
* Pest → Healthy.

## Error Explorer

Allow researchers to filter errors by:

* True class.
* Predicted class.
* Confidence.
* Correct or incorrect.
* Possible label issue.
* Visual overlap.
* Background problem.
* Image-quality problem.
* Multiple symptoms.
* Expert-review status.

Each error card should show:

* Image.
* True label.
* Predicted label.
* Prediction confidence.
* True-class probability.
* Top-three classes.
* Grad-CAM.
* Review note.
* Expert-review status.

## Scientific Interpretation

Distinguish clearly between:

* Confirmed metric evidence.
* Human-review observation.
* Possible explanation.
* Expert-confirmed label issue.

Never automatically change dataset labels based only on model disagreement.

---

# 13. Explainability Page

Route:

`/research/explainability`

Explain Grad-CAM visually and simply.

Include:

* Original image.
* Heatmap.
* Blended image.
* Predicted class.
* Confidence.
* Short interpretation.
* Limitation statement.

Add examples of:

* Correct high-confidence prediction.
* Correct low-confidence prediction.
* Incorrect high-confidence prediction.
* Visually ambiguous case.

Explain that explainability is used to detect:

* Whether the model attends to leaf lesions.
* Whether it relies on background.
* Whether cropping may be inappropriate.
* Whether a prediction needs expert review.

---

# 14. Research Page

Route:

`/research`

This page should tell the scientific story of the project.

## Research Question

How reliably can transfer-learning models classify seven visual potato leaf conditions while reducing duplicate leakage and reporting class-level uncertainty?

## Methodology

Show a clear research methodology diagram:

Dataset Audit
→ Leakage-Controlled Split
→ Moderate Augmentation
→ Transfer Learning
→ Controlled Experiments
→ Validation-Based Selection
→ One-Time Test Evaluation
→ Calibration
→ Error Analysis
→ Explainability
→ Deployment Export

## Main Findings

Present concise findings:

* Duplicate and near-duplicate control improved the credibility of evaluation.
* Class weighting produced a small improvement in class-balanced performance.
* ConvNeXtTiny produced a larger Macro F1 improvement than the weighted EfficientNetB3 experiment.
* The strongest single model outperformed the tested soft-voting combinations.
* Validation and Test Macro F1 differed by approximately 2.8 percentage points.
* Pest, Virus, and Fungi were among the weaker Test Recall classes.
* Calibration error was relatively low, but confidence should still be presented responsibly.
* Data quality and weak-class collection are more valuable next steps than simply increasing model size.

## Limitations

Include:

* Perceptual hashes do not prove biological identity.
* Visual groups do not replace true plant or acquisition-session IDs.
* The Test set is one finite sample.
* Small classes have wide uncertainty.
* Class weighting cannot create biological diversity.
* Grad-CAM is not causal proof.
* External field validation is still required.
* Real farm images may differ from the dataset.
* The model should not be presented as a replacement for laboratory diagnosis.

## Future Work

Display a prioritized roadmap:

1. Collect true plant, farm, date, and acquisition-session metadata.
2. Obtain more independent samples for weak classes.
3. Conduct agronomist review of ambiguous and high-confidence errors.
4. Validate on a completely external dataset.
5. Run multiple grouped folds or repeated seeds.
6. Evaluate higher input resolution when lesions are small.
7. Add out-of-distribution detection.
8. Add calibrated uncertainty thresholds.
9. Add expert-reviewed treatment and management content.
10. Evaluate lightweight deployment models for mobile use.

---

# 15. Human-in-the-Loop Innovation

Create a distinctive feature called:

# Field-to-Lab Learning Loop

This should be a central innovation of the platform.

## Workflow

1. A farmer uploads a potato leaf image.
2. The model provides an AI-assisted result.
3. Low-confidence or ambiguous cases are flagged.
4. The farmer may voluntarily request expert review.
5. An agronomist reviews the image and adds a note.
6. With explicit consent, the anonymized case may enter a research queue.
7. Researchers analyze recurring confusion patterns.
8. Future model versions are trained and evaluated separately.
9. New models are deployed only after formal validation.

Use a circular visual showing how field observations can responsibly improve future agricultural AI.

Important restrictions:

* No automatic retraining from unverified farmer images.
* No automatic label changes.
* No research use without explicit consent.
* No storage by default unless required for the requested feature.
* Expert-reviewed and unreviewed data must remain clearly separated.

---

# 16. Expert Review Portal

Create a protected expert interface for agronomists.

## Expert Queue

Show cases categorized as:

* Low-confidence prediction.
* High-confidence model error.
* Possible label issue.
* Fungi versus Pest ambiguity.
* Fungi versus Phytophthora ambiguity.
* Virus versus Fungi ambiguity.
* Poor image quality.
* Multiple visible symptoms.
* Out-of-scope image.

## Review Actions

Experts can:

* Confirm the visible class.
* Mark the case as uncertain.
* Request another image.
* Add observations.
* Flag possible label noise.
* Mark the image as unsuitable.
* Refer the case for laboratory testing.

Experts must not be forced to accept one of the model’s classes.

Add a clear distinction between:

* Model prediction.
* Dataset label.
* Farmer observation.
* Expert review.
* Laboratory confirmation.

---

# 17. About Page

Route:

`/about`

Tell the project story through:

* Project mission.
* Agricultural problem.
* Research motivation.
* Why transparent AI matters.
* Project team.
* Supervisors.
* University or institution.
* Technologies used.
* Responsible AI principles.
* Development roadmap.

Use placeholders for names, university, department, and supervisors.

Avoid presenting the platform as a commercial product unless explicitly stated later.

---

# 18. Contact Page

Route:

`/contact`

Provide three contact pathways:

## Farmer Support

For help with image capture, saved cases, or understanding the platform.

## Research Collaboration

For dataset collaboration, benchmarking, external validation, and publications.

## Expert Participation

For agronomists interested in reviewing ambiguous cases.

Form fields:

* Name.
* Email.
* Contact type.
* Organization, optional.
* General region, optional.
* Message.
* File attachment, optional.
* Consent checkbox.

Do not collect exact location unless it becomes necessary and the user explicitly agrees.

---

# 19. Visual Identity

The interface should combine agricultural warmth with advanced technology.

## Main Colors

Use a balanced palette such as:

* Deep Forest Green: `#12372A`
* Agricultural Green: `#2F7D4A`
* Fresh Leaf Green: `#55B96A`
* Technology Cyan: `#32BFC4`
* Warm Soil Brown: `#8B6347`
* Soft Cream Background: `#F5F3E8`
* Clean White: `#FFFFFF`
* Warning Amber: `#E9A23B`
* Error Red: `#C95858`
* Dark Text: `#17221C`

Do not make the entire website dark or neon.

Use a light, warm, natural interface for farmer pages and slightly darker analytical panels for research visualizations.

## Visual Language

Use:

* Realistic potato leaves.
* Macro leaf textures.
* Subtle soil patterns.
* Leaf veins blended with neural-network paths.
* Small data particles.
* Fine scanning lines.
* Transparent chart layers.
* Rounded cards.
* Soft natural shadows.
* Subtle glass effects only where useful.
* Scientific diagrams with clear labels.

Avoid:

* Generic robot illustrations.
* Cartoon farmers.
* Excessive neon.
* Overly futuristic holograms.
* Fake laboratory imagery.
* Plastic-looking plants.
* Green backgrounds behind every section.
* Excessive glassmorphism.
* Unreadable glowing text.

## Typography

Use a modern, clear system such as:

* English headings: Manrope or Sora.
* English body: Inter.
* Arabic interface: IBM Plex Sans Arabic or Noto Sans Arabic.

The design must support both LTR and RTL layouts.

## Icons

Use clean outline icons inspired by:

* Leaf.
* Camera.
* Microscope.
* Neural network.
* Dataset.
* Chart.
* Shield.
* Expert.
* Field.
* Document.
* Research flask.

---

# 20. Motion and Microinteractions

Use subtle motion:

* Soft scanning line across leaf images.
* Leaf veins slowly transforming into network connections.
* Metric counters on first view.
* Smooth chart transitions.
* Confidence bars filling gradually.
* Grad-CAM opacity slider.
* Gentle card hover.
* Small status pulses.

Animations should communicate state and progress, not distract the user.

Respect reduced-motion accessibility settings.

---

# 21. Accessibility

The design must include:

* Strong text contrast.
* Keyboard navigation.
* Visible focus states.
* Screen-reader labels.
* Alternative text for images.
* Do not rely on color alone.
* Text labels beside confidence colors.
* Accessible chart legends.
* Large mobile camera controls.
* Simple language in Farmer Mode.
* Arabic RTL support.
* English LTR support.
* Reduced-motion support.

---

# 22. Privacy and Responsible Data Use

Create a dedicated privacy panel.

Principles:

* Images are not stored by default for anonymous demonstrations.
* Saved cases require clear user action.
* Research contribution requires separate explicit consent.
* Remove EXIF metadata when possible before research storage.
* Do not use precise location without permission.
* Allow users to delete saved cases.
* Separate operational data from research datasets.
* Display the model version with each prediction.
* Do not silently retrain the model using user images.
* Make uncertainty visible.
* Allow users to report an incorrect result.

---

# 23. Suggested Technical Architecture

The visual prototype should be designed to support this future architecture:

## Frontend

* React or Next.js.
* TypeScript.
* Responsive Tailwind CSS.
* Arabic and English localization.
* Mobile-first camera interface.

## AI Backend

* Python FastAPI.
* TensorFlow/Keras model loading.
* The exported `final_selected_model.keras`.
* Saved `class_mapping.json`.
* Saved preprocessing and model metadata.
* Grad-CAM generation.
* Image-quality validation.
* Versioned prediction responses.

## Data and Authentication

* Supabase or PostgreSQL.
* Optional user accounts.
* Secure object storage for explicitly saved images.
* Role-based access:

  * Farmer.
  * Researcher.
  * Expert.
  * Administrator.

## Suggested Prediction API Response

```json
{
  "prediction_id": "unique-id",
  "display_class": "Fungi",
  "internal_class": "Fungi",
  "confidence": 0.78,
  "top_predictions": [
    {"class": "Fungi", "probability": 0.78},
    {"class": "Pest", "probability": 0.15},
    {"class": "Virus", "probability": 0.04}
  ],
  "confidence_status": "moderate",
  "model_name": "ConvNeXtTiny",
  "model_version": "research_v3_groupaware",
  "image_quality": {
    "status": "acceptable",
    "warnings": []
  },
  "gradcam_available": true,
  "disclaimer": "AI-assisted screening only."
}
```

The API values above are an interface example, not a fabricated prediction result.

---

# 24. Suggested Route Structure

Use the following routes:

* `/`
* `/diagnose`
* `/live`
* `/dashboard`
* `/dashboard/cases`
* `/dashboard/cases/[case-id]`
* `/diseases`
* `/diseases/[class-name]`
* `/datasets`
* `/model-performance`
* `/research`
* `/research/methodology`
* `/research/error-analysis`
* `/research/explainability`
* `/research/downloads`
* `/expert-review`
* `/about`
* `/contact`
* `/privacy`

---

# 25. MVP Priorities

Design the product in three phases.

## Phase 1 — Graduation Project Website

Prioritize:

* Home.
* AI Demo.
* Prediction Result.
* Disease Library.
* Dataset Overview.
* Model Performance.
* Research Methodology.
* Error Analysis.
* Grad-CAM examples.
* About.
* Contact.
* Responsive mobile design.
* Arabic and English readiness.

## Phase 2 — Farmer Platform

Add:

* Live Camera Scan.
* User accounts.
* Saved cases.
* Farmer Dashboard.
* PDF case reports.
* Expert-review requests.
* Feedback system.

## Phase 3 — Research and Field Network

Add:

* Expert portal.
* Anonymized research contribution.
* Dataset versioning.
* External validation studies.
* Field and season comparisons.
* Public API.
* Out-of-distribution detection.
* Model-version comparison.
* Collaborative research workspace.

---

# 26. Required Prototype Screens

Produce complete high-fidelity designs for:

1. Home page.
2. Desktop navigation and mobile navigation.
3. AI image-upload page.
4. Image-analysis loading state.
5. High-confidence result.
6. Moderate-confidence result.
7. Uncertain result.
8. Grad-CAM comparison modal.
9. Live Scan mobile screen.
10. Farmer Dashboard.
11. Saved case detail.
12. Disease Library.
13. Disease detail page.
14. Research Dashboard.
15. Dataset page.
16. Model Performance page.
17. Interactive Confusion Matrix.
18. Error Analysis explorer.
19. Explainability page.
20. Research methodology page.
21. Expert Review queue.
22. About page.
23. Contact page.
24. Privacy and consent modal.
25. Empty states.
26. Error states.
27. Unsupported-image state.
28. Mobile responsive versions of the main screens.

---

# 27. Final Design Direction

The final design should communicate:

* Scientific credibility without being intimidating.
* Advanced AI without exaggerated claims.
* Agricultural value without appearing old-fashioned.
* Clear help for farmers.
* Detailed transparency for researchers.
* Responsible confidence rather than false certainty.
* A connection between the natural structure of leaf veins and the computational structure of neural networks.

The emotional identity should be:

**The farmer sees a useful assistant.
The researcher sees a transparent experiment.
The specialist sees a responsible review system.**

Create a polished, premium, university-graduation-project-level interface that could later evolve into a real agricultural AI platform.
