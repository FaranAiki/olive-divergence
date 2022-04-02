#include "doublefield.h"

#include "effects/effectrow.h"

DoubleField::DoubleField(EffectRow* parent, const QString& id) :
  EffectField(parent, id, EFFECT_FIELD_DOUBLE),
  min_(qSNaN()),
  max_(qSNaN()),
  default_(0),
  display_type_(LabelSlider::Normal),
  frame_rate_(30),
  value_set_(false),
  kdc_(nullptr)
{
  connect(this, SIGNAL(Changed()), this, SLOT(ValueHasBeenSet()), Qt::DirectConnection);
}

double DoubleField::GetDoubleAt(double timecode)
{
  return GetValueAt(timecode).toDouble();
}

void DoubleField::SetMinimum(double minimum)
{
  min_ = minimum;
  emit MinimumChanged(min_);
}

void DoubleField::SetMaximum(double maximum)
{
  max_ = maximum;
  emit MaximumChanged(max_);
}

void DoubleField::SetDefault(double d)
{
  default_ = d;

  if (!value_set_) {
    SetValueAt(0, d);
  }
}

void DoubleField::SetDisplayType(LabelSlider::DisplayType type)
{
  display_type_ = type;
}

void DoubleField::SetFrameRate(const double &rate)
{
  frame_rate_ = rate;
}

QVariant DoubleField::ConvertStringToValue(const QString &s)
{
  return s.toDouble();
}

QString DoubleField::ConvertValueToString(const QVariant &v)
{
  return QString::number(v.toDouble());
}

QWidget *DoubleField::CreateWidget(QWidget *existing)
{
  LabelSlider* ls;

  if (existing == nullptr) {

    ls = new LabelSlider();

    if (!qIsNaN(min_)) {
      ls->SetMinimum(min_);
    }
    ls->SetDefault(default_);
    if (!qIsNaN(max_)) {
      ls->SetMaximum(max_);
    }
    ls->SetDisplayType(display_type_);
    ls->SetFrameRate(frame_rate_);

    ls->setEnabled(IsEnabled());

  } else {

    ls = static_cast<LabelSlider*>(existing);

  }

  connect(ls, SIGNAL(valueChanged(double)), this, SLOT(UpdateFromWidget(double)));
  connect(ls, SIGNAL(clicked()), this, SIGNAL(Clicked()));
  connect(this, SIGNAL(EnabledChanged(bool)), ls, SLOT(setEnabled(bool)));
  connect(this, SIGNAL(MaximumChanged(double)), ls, SLOT(SetMaximum(double)));
  connect(this, SIGNAL(MinimumChanged(double)), ls, SLOT(SetMinimum(double)));

  return ls;
}

void DoubleField::UpdateWidgetValue(QWidget *widget, double timecode)
{
  if (qIsNaN(timecode)) {
    static_cast<LabelSlider*>(widget)->SetValue(qSNaN());
  } else {
    static_cast<LabelSlider*>(widget)->SetValue(GetDoubleAt(timecode));
  }
}

void DoubleField::ValueHasBeenSet()
{
  value_set_ = true;
}

void DoubleField::UpdateFromWidget(double d)
{
  LabelSlider* ls = static_cast<LabelSlider*>(sender());

  if (ls->IsDragging() && kdc_ == nullptr) {
    kdc_ = new KeyframeDataChange(this);
  }

  SetValueAt(Now(), d);

  if (!ls->IsDragging() && kdc_ != nullptr) {
    kdc_->SetNewKeyframes();

    olive::UndoStack.push(kdc_);

    kdc_ = nullptr;
  }
}
