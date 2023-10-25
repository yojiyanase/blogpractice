class AccountsController < ApplicationController
    def show
        binding.pry
        @user = User.find(params[:id])
    end
end