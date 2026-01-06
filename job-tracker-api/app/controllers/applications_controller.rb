class ApplicationsController < ApplicationController
  RESPONSE_KEYS = [
    :id, :company_name, :role_title, :status,
    :applied_on, :follow_up_on, :last_followed_up_on,
    :job_url, :contact_email, :salary, :next_action, :notes,
    :created_at, :updated_at
  ].freeze


  def index
    applications = Application.order(applied_on: :desc, created_at: :desc)

    render json: applications.as_json(only: RESPONSE_KEYS)
  end

  def show
    application = Application.find_by(id: params[:id])
    return render json: { error: "not_found" }, status: :not_found if application.nil?

    render json: application.as_json(only: RESPONSE_KEYS)
  end
end
