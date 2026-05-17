package pl.hack4krak.androidtask

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import pl.hack4krak.androidtask.databinding.FragmentIntroBinding

class IntroFragment : Fragment() {

    private var _binding: FragmentIntroBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentIntroBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.introNextBtn.setOnClickListener {
            if (validateInputs()) {
                showInfoDialog()
            }
        }
    }

    private fun validateInputs(): Boolean {
        var isValid = true

        val name = binding.nameInput.text?.toString()?.trim() ?: ""
        val age = binding.ageInput.text?.toString()?.trim() ?: ""
        val email = binding.emailInput.text?.toString()?.trim() ?: ""
        val city = binding.cityInput.text?.toString()?.trim() ?: ""

        if (name.isEmpty()) {
            binding.nameInputLayout.error = getString(R.string.intro_error_empty)
            isValid = false
        } else {
            binding.nameInputLayout.error = null
        }

        if (age.isEmpty()) {
            binding.ageInputLayout.error = getString(R.string.intro_error_empty)
            isValid = false
        } else if (age.toIntOrNull() == null || age.toInt() < 1 || age.toInt() > 120) {
            binding.ageInputLayout.error = getString(R.string.intro_error_age)
            isValid = false
        } else {
            binding.ageInputLayout.error = null
        }

        if (email.isEmpty()) {
            binding.emailInputLayout.error = getString(R.string.intro_error_empty)
            isValid = false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.emailInputLayout.error = getString(R.string.intro_error_email)
            isValid = false
        } else {
            binding.emailInputLayout.error = null
        }

        if (city.isEmpty()) {
            binding.cityInputLayout.error = getString(R.string.intro_error_empty)
            isValid = false
        } else {
            binding.cityInputLayout.error = null
        }

        return isValid
    }

    private fun showInfoDialog() {
        AlertDialog.Builder(requireContext())
            .setTitle(getString(R.string.intro_info_title))
            .setMessage(getString(R.string.intro_info_message))
            .setPositiveButton(getString(R.string.intro_info_start)) { _, _ ->
                navigateToQuestionnaire()
            }
            .setCancelable(false)
            .show()
    }

    private fun navigateToQuestionnaire() {
        val bundle = Bundle().apply {
            putString("name", binding.nameInput.text?.toString()?.trim())
            putString("age", binding.ageInput.text?.toString()?.trim())
            putString("email", binding.emailInput.text?.toString()?.trim())
            putString("city", binding.cityInput.text?.toString()?.trim())
        }
        findNavController().navigate(
            R.id.action_IntroFragment_to_QuestionnaireFragment,
            bundle
        )
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
